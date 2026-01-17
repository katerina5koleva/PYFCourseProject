function validateForm() {
    let name = document.getElementById("name").value;
    let lastname = document.getElementById("lastname").value;
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

    return true;
}