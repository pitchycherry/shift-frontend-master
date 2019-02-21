function addBalance() {
    console.log("iukmyntbgrdc")
    const addBalanceForm = document.querySelector(".addBalanceForm");
    addBalanceForm.addEventListener("submit", event => {
        event.preventDefault();

        const data = getFieldData(event.target);
        console.log("main", "data", data);

        createRequest({path: `https://until-stepuha-server.herokuapp.com/balance`, method: "PATCH"}, {}, data)
            .then(response => {

                console.log("Счет пополнился!")
            })
            .catch(() => {
                console.log("Пользователь не аутентифицирован");
            });
    })

}