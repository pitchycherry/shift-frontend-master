auth();

let token, id;

function auth() {
    const addUserForm = document.querySelector("#addUser");
    addUserForm.addEventListener("submit", event => {
        event.preventDefault();

        const data = getFieldData(event.target);
        console.log("main", "data", data);

        createRequest({path: `https://until-stepuha-server.herokuapp.com/login`, method: "POST"}, {}, data)
            .then(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('id', response.id);
                console.log("Пользователь аутентифицирован", response);
                location.href = "http://localhost:63342/shift-frontend-master/lk.html";

            })
            .catch(() => {
                console.log("Пользователь не аутентифицирован");
            });
    })

}