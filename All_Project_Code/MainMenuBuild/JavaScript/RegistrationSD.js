function registrationTabSwitch(id) {
    if (id == "loginTab") {
        document.getElementById(id).classList.add("active");
        document.getElementById("signUpTab").classList.remove("active");
        document.getElementById("usernameLabel").innerHTML = "Username";
        document.getElementById("passwordLabel").innerHTML = "Password";
        document.getElementById("confirmPasswordGroup").style.display = "none";
        document.getElementById("submit").innerHTML = "Login";
    } else {
        document.getElementById(id).classList.add("active");
        document.getElementById("loginTab").classList.remove("active");
        document.getElementById("usernameLabel").innerHTML = "Create Username";
        document.getElementById("passwordLabel").innerHTML = "Create Password";
        document.getElementById("confirmPasswordGroup").style.display = "block";
        document.getElementById("submit").innerHTML = "Create Account";
    }
}