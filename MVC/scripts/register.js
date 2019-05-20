var expanded1 = false;

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

function postRegister(json,destination)
{
    var jsonField = "?json=" + JSON.stringify(json);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", destination+jsonField);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(destination+jsonField);
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(jsonField);
}


function getValue(){
    var usernameValue = document.getElementById("username").value;
    var passwordValue = document.getElementById("password").value;
    var repeatpassword = document.getElementById("password2").value;
    var emailValue = document.getElementById("email").value;


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
    json.password = passwordValue;
    json.repeatpassword = repeatpassword;
    json.email = emailValue;

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

    postRegister(json, "../cgi-bin/postRegister.py");
}
