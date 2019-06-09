function validate(id){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "/validate");
       xmlhttp.onreadystatechange = function() {
       if(this.readyState == 4)
        window.location.replace("index.html");
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({id:id}))
}

function searchSuggestions(){
    var searchPattern = document.getElementById("searchInput").value
    if(searchPattern == "Search...")
        return
    var ok = true;
    var contor = 1;
    while(ok){
        element = document.getElementById(""+contor)
        if(!element){
            ok = false
            break
        }
        htmeleu = (element.innerText || element.textContent).replace("Allergy","").replace("Symptoms","").replace("Prevention","")
        if(htmeleu.indexOf(searchPattern) == -1)
            element.style.display = 'none'
         else{
            element.style.display = 'block'
         }
        contor++
    }
}

function getSuggestionDetails() {
    //console.log("intra in functie")
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/suggestions");
    xmlhttp.onreadystatechange = function () {
        //console.log("intra in aici")
        if (this.readyState === 4) {
            //console.log("intra in if")
            let responseJson = JSON.parse(this.response);
            //console.log(responseJson);
            for (const [key, value] of Object.entries(responseJson)) {
                //console.log(responseJson);
                var section = document.createElement("div");
                section.className = 'timeline'


                if (key % 2 != 0) {

                    var container_left = document.createElement("div");
                    container_left.classList.add('containers');
                    container_left.classList.add('left');
                    container_left.id = String(key)

                    var allergy_title = document.createElement("h2");
                    allergy_title.classList.add('allergy-title');
                    allergy_title.innerHTML = value[3] + " Allergy ";
                    if(JSON.parse(getCookie("seanData")).id == 1)
                        allergy_title.innerHTML += "<div onclick='validate("+value[0]+")' style='cursor: pointer'>&#10004;</div>"

                    var symptoms_title = document.createElement("h3");
                    symptoms_title.innerHTML = "Symptoms";

                    var symptoms = document.createElement("p");
                    symptoms.innerHTML = value[4];

                    var prevention_title = document.createElement("h3");
                    prevention_title.innerHTML = "Prevention";

                    var prevention = document.createElement("p");
                    prevention.innerHTML = value[5];

                    var content = document.createElement("div");
                    content.classList.add('content');
                    content.appendChild(allergy_title);
                    content.appendChild(symptoms_title);
                    content.appendChild(symptoms);
                    content.appendChild(prevention_title);
                    content.appendChild(prevention);


                    container_left.appendChild(content);
                    section.appendChild(container_left);
                    document.body.appendChild(section);
                }
                else {

                    var container_right = document.createElement("div");
                    container_right.classList.add('containers');
                    container_right.classList.add('right');
                    container_right.id = String(key)


                    var allergy_title = document.createElement("h2");
                    allergy_title.classList.add('allergy-title');
                    allergy_title.innerHTML = value[3] + " Allergy";
                    if(JSON.parse(getCookie("seanData")).id == 1)
                        allergy_title.innerHTML += "<div onclick='validate("+value[0]+")' style='cursor: pointer'>&#10004;</div>"

                    var symptoms_title = document.createElement("h3");
                    symptoms_title.innerHTML = "Symptoms";

                    var symptoms = document.createElement("p");
                    symptoms.innerHTML = value[4];

                    var prevention_title = document.createElement("h3");
                    prevention_title.innerHTML = "Prevention";

                    var prevention = document.createElement("p");
                    prevention.innerHTML = value[5];

                    var content = document.createElement("div");
                    content.classList.add('content');
                    content.appendChild(allergy_title);
                    content.appendChild(symptoms_title);
                    content.appendChild(symptoms);
                    content.appendChild(prevention_title);
                    content.appendChild(prevention);


                    container_right.appendChild(content);
                    section.appendChild(container_right);
                    document.body.appendChild(section);
                }

            }
        }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
