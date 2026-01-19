function validateForm() {
    let name = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let reason = document.getElementById("reason").value;
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

    if (reason.length < 15) {
        alert("Трябва да е поне 15 символа");
        return false;
    }

    if (!password || password.length < 7 || !/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        alert("Паролата трябва да съдържа:\n - поне 7 знака;\n - големи/малки букви;\n - числа;\n - специални символи;")
        return false;
    }

    else return alert("Успешно се регистрирахте!");
}