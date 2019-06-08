function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

if(getCookie("seanData")){
     var globalData = JSON.parse(getCookie("seanData"))
     console.log(globalData)
     if(globalData){
         document.getElementById("usernameDiv").innerHTML = globalData.username
     }
 }

function postAllergy(json,callback)
{
     var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "/add_allergy");
       xmlhttp.onreadystatechange = function() {
       if(this.readyState == 4)
        callback(JSON.parse(xmlhttp.responseText));
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json));
}


function getValue(){
    var allergy_type = document.getElementById("optionType").value;
   

    var name = document.getElementById("name").value;
    var symptoms = document.getElementById("symptoms").value;
    var prevention = document.getElementById("prevention").value;
    var treatment = document.getElementById("treatment").value;
    var medication = document.getElementById("medication").value;

    console.log(allergy_type);
    console.log(name);
    console.log(symptoms);
    console.log(prevention);
    console.log(treatment);
    console.log(medication);

    json = {}

    json.allergy_type = allergy_type;
    json.name = name;
    var globalData = JSON.parse(getCookie("seanData"));
    json.id = globalData['id'];
    json.symptoms = symptoms;
    json.prevention = prevention;
    json.treatment = treatment;
    json.medication = medication;

    postAllergy(json, function(response){
        console.log(response)
        alert("Succesfully added!");
        window.location.replace("suggestions.html");
    });


}