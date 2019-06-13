function postAllergy(json, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/add_allergy");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4)
            callback(JSON.parse(xmlhttp.responseText));
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json));
}


function getValue() {
    var allergy_type = document.getElementById("optionType").value;
    var name = document.getElementById("name").value.replace(/^\s*|\s*$/g, '');
    var description = document.getElementById("description").value.replace(/^\s*|\s*$/g, '');
    var symptoms = document.getElementById("symptoms").value.replace(/^\s*|\s*$/g, '');
    var prevention = document.getElementById("prevention").value.replace(/^\s*|\s*$/g, '');
    var treatment = document.getElementById("treatment").value.replace(/^\s*|\s*$/g, '');
    var medication = document.getElementById("medication").value.replace(/^\s*|\s*$/g, '');

    if (name.length < 1) {
        alert("Empty field \"Name\"!");
        return
    }
    
    if (name.length > 45) {
        alert("Name too long!");
        return
    }

    if (description.length < 1) {
        alert("Empty field \"Description\"!");
        return
    }

    if (description.length > 500) {
        alert("Description too long!");
        return
    }

    if (symptoms.length < 1) {
        alert("Empty field \"Symptoms\"!");
        return
    }

    if (symptoms.length > 500) {
        alert("Too many characters in symptoms field!");
        return
    }

    if (prevention.length < 1) {
        alert("Empty field \"Prevention\"!");
        return
    }

    if (prevention.length > 500) {
        alert("Too many characters in prevention field!");
        return
    }

    if (treatment.length < 1) {
        alert("Empty field \"Treatment\"!");
        return
    }

    if (treatment.length > 500) {
        alert("Too many characters in treatment field!");
        return
    }

    if (medication.length < 1) {
        alert("Empty field \"Medication\"!");
        return
    }

    if (medication.length > 500) {
        alert("Too many characters in medication field!");
        return
    }

    json = {}

    json.allergy_type = allergy_type;
    json.name = name;
    json.description = description;
    var globalData = JSON.parse(getCookie("seanData"));
    json.id = globalData['id'];
    json.symptoms = symptoms;
    json.prevention = prevention;
    json.treatment = treatment;
    json.medication = medication;

    postAllergy(json, function (response) {
        console.log(response)
        alert("Succesfully added!");
        window.location.replace("suggestions.html");
    });

}