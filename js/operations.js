getMyOperation();

function getOperations() {
    /*Отображение списка просьб всех польователей*/
    createRequest({path: 'https://until-stepuha-server.herokuapp.com/requests', method: 'GET'}, {}).then(response => {
        renderOperations(response, "Просьбы всех пользователей:");
    })

}

/*Функция создания доната*/
function createDonate(operationId, operationBalance, operationAim) {
    const valueJSON = getFieldData('.createDonate');
    valueJSON.value = Number(valueJSON.value);
    createRequest({
        path: `https://until-stepuha-server.herokuapp.com/requests/${operationId}`,
        method: "PATCH"
    }, {}, valueJSON)
        .then(response => {
            console.log("aervsaer")
            /*добавление к прогресс бару значения*/
            /*operationBalance = operationBalance + balance;
            console.log(operationBalance);
            document.querySelector(`.card-${operationId} .balance`).innerHTML = `Собрано: ${operationBalance}`;
            document.querySelector(`.card-${operationId} .progress-bar`).style.width = `${(operationBalance) * 100 / operationAim}%`;
            document.querySelector(`.card-${operationId} .createDonate`).innerHTML = `<p class="text-center">Донат отправлен</p>`;
            console.log("Донат отправлен");*/
        })
        .catch(() => {
            console.log("Донат не отправлен");
        });
}

document.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target.dataset);
    const dataOperaton = event.target.dataset.operation;
    if (dataOperaton) {
        const operation = JSON.parse(dataOperaton);
        // createDonate(operation.id, operation.balance, operation.aim);

        const valueJSON = getFieldData(event.target);
        valueJSON.value = Number(valueJSON.value);
        createRequest({
            path: `https://until-stepuha-server.herokuapp.com/requests/${operation.id}`,
            method: "PATCH"
        }, {}, valueJSON)
            .then(response => {
                console.log("aervsaer")
                /*добавление к прогресс бару значения*/
                /*operationBalance = operationBalance + balance;
                console.log(operationBalance);
                document.querySelector(`.card-${operationId} .balance`).innerHTML = `Собрано: ${operationBalance}`;
                document.querySelector(`.card-${operationId} .progress-bar`).style.width = `${(operationBalance) * 100 / operationAim}%`;
                document.querySelector(`.card-${operationId} .createDonate`).innerHTML = `<p class="text-center">Донат отправлен</p>`;
                console.log("Донат отправлен");*/
            })
            .catch((e) => {
                console.log(e);
                console.log("Донат не отправлен");
            });
    }

});

//var myId = localStorage.getItem("id");
//compareAuthorID(myId, operation.name);
//console.log("ввели крестик")

function compareAuthorID(myId, id) {
    if (myId === id) {
        /*$('.card-body').prepend(`
            <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>`)*/
        document.querySelector(".card-body").textContent = "Просьбы:";
    }
}
/*Получение всех польователей*/
let users;
createRequest({
    path: `https://until-stepuha-server.herokuapp.com/users`,
    method: "GET"
}, {}).then(response => {
    //localStorage.setItem('users', response);
    users = response;
    console.log("И это тоже все пользователи", users);
});

function renderOperations(data, title) {
    /*Заголовок тела страницы*/
    document.querySelector(".page-body.col-md-8 .b_font").textContent = `${title}`;
    /*Компонент для операций*/
    document.querySelector("#page-body_content .row").innerHTML = data.map(operation =>
        `
    
        <div class="card operation card-${operation.id}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${operation.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${users.find(user => user.id === operation.authorID).name}</h6>
                <p class="card-text">${operation.description}</p>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                         style="width:${operation.balance * 100 / operation.aim}%"
                         aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="aim">Цель: ${operation.aim}р</p>
                <p class="balance">Собрано: ${operation.balance}р</p>
                <form class="createDonate" data-operation='${JSON.stringify(operation)}'>
                    <div class="row">
                        <input type="number" name="value" class="form-control input-operations_balance col-6">
                        <button type="submit" class="btn btn-outline-success col-4 button-operations">Помочь</button>
                    </div>
                </form>
            </div>
        </div>

`);
}

function getConcreteOperation(userId) {
    createRequest({path: `https://until-stepuha-server.herokuapp.com/requests?userId=${userId}`, method: 'GET'}, {}).then(response => {
        renderOperations(response, "Просьбы:");
        console.log(response)
    })
}

function getMyOperation() {
    createRequest({path: `https://until-stepuha-server.herokuapp.com/requests?userId=${localStorage.getItem('id')}`, method: 'GET'}, {}).then(response => {
        renderOperations(response, "Мои просьбы:");
        console.log(response)
    })
}