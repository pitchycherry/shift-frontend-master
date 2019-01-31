createRequest({path: `http://demo6634020.mockable.io/users`, method: "GET"}, {}).then(response => {
    document.querySelector(".profile.col-md-3").innerHTML = response.map(user => `
        <b class="b_font">${user.name}</b><br><br>
        <p>Карма: ${user.karma}</p>
        <p>Максимальный запрос: ${user.maxRequest}</p>
        <p>Баланс: ${user.balance}</p>
        <button class="btn btn-outline-success btn_info-user" type="button" data-toggle="modal" data-target="#createPetitionModal" onclick="createPetition()">Создать новую просьбу</button>
        
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
                            <label for="createPetitionName">Имя</label>
                            <input class="form-control" id="createPetitionName" placeholder="Введите имя">
                        </div>
                        <div class="form-group">
                            <label for="createPetitionDescription">Описание</label>
                            <textarea class="form-control" id="createPetitionDescription" placeholder="Опишите просьбу" rows="5"></textarea>
                        </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline-success">Создать</button>
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

/*Создание просьбы*/
function createPetition() {

}