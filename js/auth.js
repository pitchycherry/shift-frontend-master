auth();

let token;

function auth() {
    const addUserForm = document.querySelector("#addUser");
    addUserForm.addEventListener("submit", event => {
        event.preventDefault();

        const data = getFieldData(event.target);
        console.log("main", "data", data);

        createRequest({ path: `http://demo6634020.mockable.io/login`, method: "POST" }, {}, data)
            .then(response => {
                localStorage.setItem('token', response.token);
                location.href= "http://localhost:63342/shift-frontend-master/lk.html";
                console.log("Пользователь аутентифицирован", response);

            })
            .catch(() => {
                console.log("Пользователь не аутентифицирован");
            });
    });
}