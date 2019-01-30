auth();

let token;

function auth() {
    const addUserForm = document.querySelector("#addUser");
    addUserForm.addEventListener("submit", event => {
            event.preventDefault();

            const data = getFieldData(event.target);
            console.log("main", "data", data);

            createRequest({path: `http://demo6634020.mockable.io/login`, method: "POST"}, {}, data)
                .then(response => {
                    localStorage.setItem('token', response.token);
                    console.log("Токен отправлен")
                    createRequest({path: `http://demo6634020.mockable.io/users`, method: "GET"}, {})
                        .then(response => {

                            //document.querySelector(".auth-form").textContent = "jfjfjfjfj:";
                            //location.href = "http://localhost:63342/shift-frontend-master/lk.html";
                            document.querySelector(".profile.col-md-3").innerHTML = `<p>emvekrmvkemrvk</p>`;
                                console.log("Данные пользователя получены", response);
                        })
                        .catch(() => {
                            console.log("Данные пользователя не получены");
                        });

                    console.log("Пользователь аутентифицирован", response);

                })
                .catch(() => {
                    console.log("Пользователь не аутентифицирован");
                });
        }
    )

}