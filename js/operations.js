const operationsList = [
    {
        id: 5,
        name: "Дайте денег",
        description: "Есть нечего совсем, три сотки братан, ну пжлст",
        authorID: "Никита Григорьев",
        aim: 300,
        balance: 150
    },
    {
        id: 5,
        name: "Дайте денег",
        description: "Есть нечего совсем, три сотки братан, ну пжлст",
        authorID: "Никита Григорьев",
        aim: 300,
        balance: 150
    }
]
document.ready(function () {
    document.querySelector("#oper").innerHTML = operationsList.map(operation =>
        <div class="card operation" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{operation.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{operation.authorID}</h6>
                <p class="card-text">{operation.description}</p>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 50%"
                         aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="aim">Цель: {operation.aim}р</p>
                <p class="balance">Собрано: {operation.balance}р</p>
                <a href="#" class="card-link">Помочь</a>
            </div>
        </div>
    );
});