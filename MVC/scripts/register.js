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

    var catAlergii = [];




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

    var weatherList = []
    var checks1 = document.getElementsByClassName('checks1');
    for( i =0;i<3;i++)
    {
        if( checks1[i].checked == true){
            weatherList.push(checks1[i].value)
           
        } 
    }
    console.log(weatherList)

    var respiratoryList = []
    var checks2 = document.getElementsByClassName('checks2');
    for( i =0;i<4;i++)
    {
        if( checks2[i].checked == true){
            respiratoryList.push(checks2[i].value)
        } 
    }
    console.log(respiratoryList)

    var foodList = []
    var checks3 = document.getElementsByClassName('checks3');
    for( i =0;i<4;i++)
    {
        if( checks3[i].checked == true){
            foodList.push(checks3[i].value)
        } 
    }
    console.log(foodList)

    var otherAllergy = document.getElementById("another-allergy").value;

   
    json = {};

    json.username = usernameValue;
    json.password = hashfunction(passwordValue);
    json.email = emailValue;
    json.sex = sexValue;

    // for(i=0; i<weatherList.length-1;i++){
    //     json.weatherAllergy[i] = weatherList[i];
    // }
    
    // for(i=0; i<respiratoryList.length-1;i++){
    //     json.respiratoryAllergy[i] = respiratoryList[i];
    // }

    // for(i=0; i<foodList.length-1;i++){
    //     json.foodAllergy[i] = foodList[i];
    // }

    json.otherAllergy = otherAllergy;

    postRegister(json, function(response){
        console.log(response)
        window.location.replace("login.html");
    });


}
