getMyInfo();
function getMyInfo() {
    createRequest({
        path: `https://until-stepuha-server.herokuapp.com/users/${localStorage.getItem("id")}`,
        method: "GET"
    }, {}).then(response => {
        document.querySelector(".profile.col-md-3").innerHTML = [response].map(user => `
            <div class="about-user">
                <b class="b_font">${user.name}</b><br><br>
                <p>Карма: ${user.karma}</p>
                <p>Максимальный запрос: ${user.maxRequest}</p>
                <p>Баланс: ${user.balance}</p>
                <button class="btn btn-outline-success btn_info-user" type="button" data-toggle="modal" data-target="#createPetitionModal" onclick="createPetition()">Создать новую просьбу</button><br><br>
                <form class="addBalanceForm">
                    <b class="b_font">Пополнить кошелек</b><br><br>
                    <input type="text" name="delta" class="form-control btn_info-user" placeholder="Введите сумму">
                    <button class="btn btn-outline-success btn_info-user" type="submit" onsubmit="addBalance()">Пополнить баланс</button>
                </form>
            </div>
            
            <!--Модальное окно создания новой просьбы-->
            <div class="modal fade" id="createPetitionModal" tabindex="-1" role="dialog" aria-labelledby="createPetitionModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form id="createPetition">
                      <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="createPetitionModalLabel">Создание новой просьбы</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                            <div class="form-group">
                                <label for="createPetitionName">Название</label>
                                <input class="form-control" type="text" name="name" id="createPetitionName" placeholder="Введите название">
                            </div>
                            <div class="form-group">
                                <label for="createPetitionDonate">Требуемая сумма</label>
                                <input class="form-control" type="number" name="value" id="createPetitionDonate" placeholder="Введите сумму">
                            </div>
                            <div class="form-group">
                                <label for="createPetitionDescription">Описание</label>
                                <textarea class="form-control" name="description" id="createPetitionDescription" placeholder="Опишите просьбу" rows="5"></textarea>
                            </div>
                      </div>
                      <div class="modal-footer">
                        <button type="submit" class="btn btn-outline-success">Создать</button>
                      </div>
                    </form>
                </div>
              </div>
            </div>
     `);
        console.log("Данные пользователя получены", response);
    })
        .catch(() => {
            console.log("Данные пользователя не получены");
        });
}

/*Создание просьбы*/
function createPetition() {
    const createPetitionForm = document.querySelector("#createPetition");
    createPetitionForm.addEventListener("submit", event => {
        event.preventDefault();

        const data = getFieldData(event.target);
        console.log("main", "data", data);

        createRequest({path: `https://until-stepuha-server.herokuapp.com/requests`, method: "POST"}, {}, data)
            .then(response => {
                $(function () {
                    $('#createPetitionModal').modal('toggle');
                });
                getMyOperation();
                //getOneOperation(response.id);
                console.log("Просьба создана", response);
            })
            .catch(() => {
                console.log("Просьба не создана");
            });
    })
}

/*Добавление одной просьбы */
/*function getOneOperation(idOperation) {
    createRequest({
        path: `https://until-stepuha-server.herokuapp.com/requests/${idOperation}`,
        method: 'GET'
    }, {}).then(response => {
        document.querySelector("#page-body_content .row").innerHTML = response.map(operation => {
            `
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
                <form class="createDonate" onsubmit="createDonate('${operation.id}', ${operation.balance}, ${operation.aim}); return false;">
                    <div class="row">
                        <input type="number" name="value" class="form-control input-operations_balance col-6">
                        <button type="submit" class="btn btn-outline-success col-4 button-operations">Помочь</button>
                    </div>
                </form>
            </div>
        </div>`
        })
        console.log("Просьба добавлена", response);
    })
        .catch(() => {
            console.log("Просьба не добавлена");
        });
}*/