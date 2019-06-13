
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function postRegister(json,callback)
{
     var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "/register");
       xmlhttp.onreadystatechange = function() {
       if(this.readyState == 4)
        callback(JSON.parse(xmlhttp.responseText));
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json))
}


function getValue(){
    var usernameValue = document.getElementById("username").value;
    var passwordValue = document.getElementById("password").value;
    var repeatpassword = document.getElementById("password2").value;
    var emailValue = document.getElementById("email").value;
    var sexValue = document.getElementById("sex").value;

    if(usernameValue.length < 1)
    {
        alert("Username field is empty!");
        return
    }

    if(usernameValue.length < 4)
    {
        alert("Username length is too small!");
        return
    }

    if(passwordValue.length < 1)
    {
        alert("Password field is empty!");
        return
    }

    if(passwordValue.length<6)
    {
        alert("Password too small!");
        return
    }

    if(passwordValue != repeatpassword)
    {
        alert("Passwords do not coincide!");
        return
    }

    if(emailValue.length < 1)
    {
        alert("Email field is empty!");
        return
    }

    if(!validateEmail(emailValue))
    {
        alert("Invalid email!");
        return
    }

    json = {};

    json.username = usernameValue;
    json.password = hashfunction(passwordValue);
    json.email = emailValue;
    json.sex = sexValue;

    postRegister(json, function(response){
        console.log(response)
        window.location.replace("login.html");
    });

}
