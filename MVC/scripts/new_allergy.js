// if(getCookie("seanData")){
//     var globalData = JSON.parse(getCookie("seanData"))
//     console.log(globalData)
//     if(globalData){
//         document.getElementById("logoutDiv").style.display="block"
//         document.getElementById("usernameDiv").innerHTML = globalData.username
//         document.getElementById("usernameDiv").style.display = "block"
//         document.getElementById("addAllergyDiv").style.display="block"
//         document.getElementById("registerDiv").style.display="none"
//         document.getElementById("loginDiv").style.display="none"
//     }
// }

function postAllergy(json,callback)
{
     var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "/add_allergy");
       xmlhttp.onreadystatechange = function() {
       if(this.readyState == 4)
        callback(JSON.parse(xmlhttp.responseText));
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json))
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
    json.symptoms = symptoms;
    json.prevention = prevention;
    json.treatment = treatment;
    json.medication = medication;

    postAllergy(json, function(response){
        console.log(response)
        alert("Succesfully added!");
        window.location.replace("index.html");
    });


}