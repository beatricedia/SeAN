var expanded1 = false;

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showCheckboxes1() {
    var checkboxes1 = document.getElementById("checkboxes1");
    if (!expanded1) {
        checkboxes1.style.display = "block";
        expanded1 = true;
    } else {
        checkboxes1.style.display = "none";
        expanded1 = false;
    }
}

var expanded2 = false;

function showCheckboxes2() {
    var checkboxes2= document.getElementById("checkboxes2");
    if (!expanded2) {
        checkboxes2.style.display = "none";
        expanded2 = true;
    } else {
        checkboxes2.style.display = "block";
        expanded2 = false;
    }
}

var expanded3 = false;

function showCheckboxes3() {
    var checkboxes3= document.getElementById("checkboxes3");
    if (!expanded3) {
        checkboxes3.style.display = "none";
        expanded3 = true;
    } else {
        checkboxes3.style.display = "block";
        expanded3 = false;
    }
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

    if(usernameValue.length<4)
    {
        alert("Username de lungime prea mica");
        return
    }

    if(passwordValue.length<6)
    {
        alert("Parola de lungimea prea mica");
        return
    }

    if(passwordValue != repeatpassword)
    {
        alert("Parolele nu coincid");
        return
    }

    if(!validateEmail(emailValue))
    {
        alert("Email invalid");
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
