
function postLogin(json,callback)
{
     var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "/login");
       xmlhttp.onreadystatechange = function() {
       if(this.readyState == 4)
            callback(JSON.parse(xmlhttp.responseText))
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json))
}


function getLoginData(){
    var emailValue = document.getElementById("email").value;
    var passwordValue = document.getElementById("password").value;

    console.log(emailValue);
    console.log(passwordValue);
    json = {};

    json.email = emailValue;
    json.password = hashfunction(passwordValue);
    postLogin(json,function(response){
        if(response.type=="Error")
            alert(response.message)
        else{
            setCookie("seanData", JSON.stringify(response.data), 1)
            window.location.replace("/")
        }
    });
}