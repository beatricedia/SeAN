function postLogin(json,destination)
{
    var jsonField = "?json=" + JSON.stringify(json);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", destination+jsonField);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {    console.log("intra in post")
            console.log(destination+jsonField);
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(jsonField);
}


function getLoginData(){
    console.log("intra in login")
    var emailValue = document.getElementById("email").value;
    var passwordValue = document.getElementById("password").value;

    console.log(emailValue);
    console.log(passwordValue);
    json = {};

    json.email = emailValue;
    json.password = passwordValue;
    postLogin(json, "../cgi-bin/postLogin.py");
}