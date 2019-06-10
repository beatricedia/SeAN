function listAllergies(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/user_allergies_profile"+JSON.parse(getCookie("seanData")).id);
  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
        var placeholder = document.getElementById("checkboxholder")
        var alergii = JSON.parse(this.response)
        for(var alergieToken in alergii){
            alergie = alergii[alergieToken]
            var id = alergie[0]
            var nume = alergie[1]
            var categorie = alergie[2]
            var checked = alergie[alergie.length-1]
            var checkbox = document.createElement('input');
            if(checked)
                checkbox.checked = true
            checkbox.type = "checkbox";
            checkbox.id = id;

            var label = document.createElement('label');
            label.appendChild(document.createTextNode(("Category: "+categorie + " || Allergy:     ").toLowerCase() + nume));


            var container = document.createElement("div");
            container.appendChild(label)
            container.appendChild(checkbox)
            container.classList.add("user_container");

            placeholder.appendChild(container)

            if(JSON.parse(getCookie("seanData")).notificare1)
                document.getElementById("notificare1").checked = true;
            else
                document.getElementById("notificare1").checked = false;

            if(JSON.parse(getCookie("seanData")).notificare2)
                document.getElementById("notificare2").checked = true;
            else
                document.getElementById("notificare2").checked = false;

        }
    }
  }
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send();
}

function saveSettings()
{
    var placeholder = document.getElementById("checkboxholder")
    var copii = placeholder.childNodes;
    var json = { }

    json.id = JSON.parse(getCookie("seanData")).id
    json.alergii = []
    if( document.getElementById("notificare1").checked )
    {
       json.notificare1 = 1
        var dataSean = JSON.parse(getCookie("seanData"))
        dataSean.notificare1 = 1
        setCookie("seanData", JSON.stringify(dataSean), 1)
    }
    else
    {
        json.notificare1=0
        var dataSean = JSON.parse(getCookie("seanData"))
        dataSean.notificare1 = 0
        setCookie("seanData", JSON.stringify(dataSean), 0)
    }


    if( document.getElementById("notificare2").checked )
    {
       json.notificare2 = 1
        var dataSean = JSON.parse(getCookie("seanData"))
        dataSean.notificare2 = 1
        setCookie("seanData", JSON.stringify(dataSean), 1)
    }
    else
    {
        json.notificare2=0
        var dataSean = JSON.parse(getCookie("seanData"))
        dataSean.notificare2 = 0
        setCookie("seanData", JSON.stringify(dataSean), 0)
    }


    for(var i=0; i<copii.length; i++)
    {
        var copil = copii[i]
        var checkbox = copil.childNodes[1]
        if(checkbox.checked)
            json.alergii.push(checkbox.id)
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "setari");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(JSON.stringify(json));


}


