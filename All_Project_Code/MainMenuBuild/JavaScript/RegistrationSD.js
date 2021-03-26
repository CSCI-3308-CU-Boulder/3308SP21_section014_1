function registrationTabSwitch(id) {
    document.getElementById(id).classList.add("active");
    if (id == "loginTab") {
        document.getElementById("signUpTab").classList.remove("active");
        
        var loginElements = document.getElementsByClassName("login");
        var createAccountElements = document.getElementsByClassName("createAccount");
        for (var i = 0; i < loginElements.length; i++) {
            loginElements[i].style.display = "block";
        }
        for (var i = 0; i < createAccountElements.length; i++) {
            createAccountElements[i].style.display = "none";
            createAccountElements[i].value = '';
        }

        document.getElementById("submitLogin").style.display = "block";
        document.getElementById("submitCreateAccount").style.display = "none";
    } else {
        document.getElementById("loginTab").classList.remove("active");

        var loginElements = document.getElementsByClassName("login");
        var createAccountElements = document.getElementsByClassName("createAccount");
        for (var i = 0; i < loginElements.length; i++) {
            loginElements[i].style.display = "none";
            loginElements[i].value = '';
        }
        for (var i = 0; i < createAccountElements.length; i++) {
            createAccountElements[i].style.display = "block";
        }

        document.getElementById("submitLogin").style.display = "none";
        document.getElementById("submitCreateAccount").style.display = "block";
    }
}

function loginHandler() {
    var username = document.getElementById("inputUsername");
    var password = document.getElementById("inputPassword");
    var newUsername = document.getElementById("inputNewUsername");
    var newPassword = document.getElementById("inputNewPassword");
    var confirmPassword = document.getElementById("confirmPassword");
    var submitLogin = document.getElementById("submitLogin");
    var submitCreateAccount = document.getElementById("submitCreateAccount");

    password.onkeyup = function() {
        if (username.value.length > 0 && password.value.length >= 8) submitLogin.disabled = false;
        else submitLogin.disabled = true;
    }

    newPassword.onkeyup = function() {
        if (newUsername.value.length > 0 && newPassword.value.length >= 8 && newPassword.value == confirmPassword.value) submitCreateAccount.disabled = false;
        else submitCreateAccount.disabled = true;
    }

    confirmPassword.onkeyup = function() {
        if (newUsername.value.length > 0 && newPassword.value.length >= 8 && newPassword.value == confirmPassword.value) submitCreateAccount.disabled = false;
        else submitCreateAccount.disabled = true;
    }
}
