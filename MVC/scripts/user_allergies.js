// var checkbox = document.createElement('input');
// checkbox.type = "checkbox";
// checkbox.name = "name";
// checkbox.value = "value";
// checkbox.id = "id";

// var label = document.createElement('label')
// label.htmlFor = "id";
// label.appendChild(document.createTextNode('text for label after checkbox'));

// container.appendChild(checkbox);
// container.appendChild(label);


// var x = document.getElementById("myCheck");
//   x.checked = true;   //bifeaza 


// var container =document.createElement("div");
//   var x = document.createElement("INPUT");
//   x.setAttribute("type", "checkbox");

//   x.name = "name";
//   x.value = "value";
//   var label = document.createElement('label')
// label.htmlFor = "id";
// label.appendChild(document.createTextNode('text for label after checkbox'));

// container.appendChild(x);
// container.appendChild(label);
//   document.body.appendChild(container);

function getAllergyNames() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/user_allergies");
  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let responseJson = JSON.parse(this.response);
      console.log("intra in if");
      for (const [key, value] of Object.entries(responseJson)) {
        console.log("intra in for");
        var section = document.createElement("section");
        if (section)
          section.classList.add('corpus');

        var container = document.createElement("div");
        container.classList.add("user_container");
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = String(key);
        console.log(checkbox.id);
        var label = document.createElement('label');
        label.htmlFor = String(key);
        label.appendChild(document.createTextNode(value[1]));
        container.appendChild(checkbox);
        container.appendChild(label);
        section.appendChild(container);
        document.body.appendChild(section);
      }

      var submit = document.createElement("INPUT");
      submit.setAttribute("type", "submit");
      document.body.appendChild(submit);
    }
  }
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send();
}

function postUserAllergies(json, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", "/add_user_allergies");
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4)
      callback(JSON.parse(xmlhttp.responseText));
  };
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(json));
}


function getAllergyValue() {
  console.log("intrs in functie");

  json = {};
  var globalData = JSON.parse(getCookie("seanData"));
  json.id = globalData['id'];
  json.countAllergies = 0
  json.allergiesId = []

  var ok = true;
  var contor = 1;
  while(ok){
        var element = document.getElementById(""+contor)
        if(!element){
            ok = false
            break
        }
        var box = element.checked
        if (box == true){
            console.log("Test")
            console.log(box)
            json.allergiesId.push(contor)
            json.countAllergies += 1
        }

        contor++
    }

  for (i = 0; i < json.countAllergies; i++)
    console.log(json.allergiesId[i])
  console.log(json)
  postUserAllergies(json, function (response) {
    console.log(response)
    alert("Your allergies were succesfully added!");
    window.location.replace("index.html");
  });

}

