function validateForm() {
    let name = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    if (name.length < 2) {
        alert("Името трябва да е поне 2 символа");
        return false;
    }

    if (lastname.length < 2) {
        alert("Фамилията трябва да е поне 2 символа");
        return false;
    }

    if (email.length < 2) {
        alert("Имейлът трябва да е поне 2 символа");
        return false;
    }

    if (!password || password.length < 7 || !/\d/.test(password) || !/[A-Z]/.test(password) || !!/[a-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        alert("")
        return false;
    }

    //reason

    else return alert("Успешно се регистрирахте!");
}