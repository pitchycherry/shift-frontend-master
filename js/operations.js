getOperations();

function getOperations() {
    createRequest({path: 'http://demo6634020.mockable.io/operations', method: 'GET'}, {}).then(response => {
        renderOperations(response);
    })

}

/*Функция создания доната*/
function createDonate(operationId, operationBalance, operationAim) {
    const createDonate = document.querySelector(`.card-${operationId} .createDonate`);
    console.log(createDonate)
    createDonate.addEventListener("submit", event => {
            event.preventDefault();

            const data = getFieldData(event.target);
            console.log("main", "data", data);
            createRequest({path: `http://demo6634020.mockable.io/request/id`, method: "PATCH"}, {}, data)
                .then(response => {
                    /*добавление к прогресс бару значения*/
                    console.log(operationId);
                    operationBalance = operationBalance + +data.value;
                    document.querySelector(`.card-${operationId} .balance`).innerHTML = `Собрано: ${operationBalance}`;
                    document.querySelector(`.card-${operationId} .progress-bar`).style.width = `${(operationBalance)*100/operationAim}%`;
                    document.querySelector(`.card-${operationId} .createDonate`).innerHTML = `<p class="text-center">Донат отправлен</p>`;
                    console.log("Донат отправлен");
                })
                .catch(() => {
                    console.log("Донат не отправлен");
                });
        }
    )
}

function renderOperations(data) {
    /*Заголовок тела страницы*/
    document.querySelector(".page-body.col-md-8 .b_font").textContent = "Операции:";
    /*Компонент для операций*/
    document.querySelector("#page-body_content .row").innerHTML = data.map(operation => `
    
        <div class="card operation card-${operation.id}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${operation.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${operation.authorID}</h6>
                <p class="card-text">${operation.description}</p>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                         style="width:${operation.balance * 100 / operation.aim}%"
                         aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="aim">Цель: ${operation.aim}р</p>
                <p class="balance">Собрано: ${operation.balance}р</p>
                <form class="createDonate">
                    <div class="row">
                        <input type="number" name="value" class="form-control input-operations_balance col-6">
                        <button type="submit" class="btn btn-outline-success col-4 button-operations" onclick="createDonate(${operation.id}, ${operation.balance}, ${operation.aim})">Помочь</button>
                    </div>
                </form>
            </div>
        </div>

`);
}

