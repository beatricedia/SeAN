function postFeedback(json,callback)
{
     var xmlhttp = new XMLHttpRequest();


    xmlhttp.open("POST", "/feedback");
    xmlhttp.onreadystatechange = function() {
       if(this.readyState == 4)
        callback(JSON.parse(xmlhttp.responseText));
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json));
}


function getFeedback(){


    var rating = document.getElementById("rating").value.replace(/^\s*|\s*$/g,'');
    var name = document.getElementById("name").value.replace(/^\s*|\s*$/g,'');
    var email = document.getElementById("email").value.replace(/^\s*|\s*$/g,'');
    var message = document.getElementById("message").value.replace(/^\s*|\s*$/g,'');

    if (name.length <1){
        alert("Empty field \"Name\"!");
        return
    }

    if(!validateEmail(email))
    {
        alert("Invalid email");
        return
    }
    if (message.length <1){
        alert("Empty field \"Your message\"!");
        return
    }

    console.log(rating);
    console.log(message);
    console.log(name);
    console.log(email);
    json = {}

    json.rating = rating;
    json.name = name;
    json.email = email;
    json.message = message;
    var globalData = JSON.parse(getCookie("seanData"));
    json.id_user = globalData['id'];

    postFeedback(json, function(response){
        console.log(response)
        alert("Succesfully added!");
        window.location.replace("index.html");
    });


}