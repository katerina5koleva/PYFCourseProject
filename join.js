function validateForm() {
    let name = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;


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

    //reason

    else return alert("Успешно се регистрирахте, ще се свържем с Вас скоро!");
}