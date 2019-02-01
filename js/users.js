function getUsers() {
    createRequest({
        path: `https://until-stepuha-server.herokuapp.com/users`,
        method: "GET"
    }, {}).then(response => {
        /*Заголовок тела страницы*/
        document.querySelector(".page-body.col-md-8 .b_font").textContent = "Другие пользователи:";
        /*Компонент для операций*/
        document.querySelector("#page-body_content .row").innerHTML = response.map(user =>
        `
            <div class="card operation card-${user.id}" style="width: 18rem;">
                <div class="card-body">
                    <div class="about-user">
                        <b class="card-title">${user.name}</b><br><br>
                        <p>Карма: ${user.karma}</p>
                        <p>Максимальный запрос: ${user.maxRequest}</p>
                        <button type="button" class="btn btn-outline-success col-12" onclick="getConcreteOperation('${user.id}')">Получить просьбы</button>
                    </div>
                </div>
            </div>  
        `);
        console.log("Все пользователи получены", response);
        return response;
    })
        .catch(() => {
            console.log("Данные пользователя не получены");
        });
}