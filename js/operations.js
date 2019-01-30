getOperations();

function getOperations() {
    createRequest({path: 'http://demo6634020.mockable.io/operations', method: 'GET'}).then(response => {
        renderOperations(response);
    })

}

function renderOperations(data) {
    /*Заголовок тела страницы*/
    document.querySelector(".page-body.col-md-8 .b_font").textContent = "Операции:";
    /*Компонент для операций*/
    document.querySelector("#page-body_content .row").innerHTML = data.map(operation => `
    
        <div class="card operation " style="width: 18rem;">
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
                <a href="#" class="card-link">Помочь</a>
            </div>
        </div>

`);
}

