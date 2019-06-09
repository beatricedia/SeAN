if(getCookie("seanData")){
    var globalData = JSON.parse(getCookie("seanData"))
    console.log(globalData)
    if(globalData){
        document.getElementById("commentDiv").style.display="block"
        document.getElementById("addDiv").style.display = "block"

    }
}


function postComment(json,callback)
{
     var xmlhttp = new XMLHttpRequest();


    xmlhttp.open("POST", "/add_comment");
       xmlhttp.onreadystatechange = function() {
       if(this.readyState == 4)
        callback(JSON.parse(xmlhttp.responseText));
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(json));
}


function getComment(){
    var comment = document.getElementById("comment").value.replace(/^\s*|\s*$/g,'');
    json = {}
    json.comment = comment;

    var globalData = JSON.parse(getCookie("seanData"));
    json.username = globalData['username'];
    element = document.getElementById("allergy-title");
    json.allergy_name = element.getElementsByClassName("highlight")[0].innerHTML;


    postComment(json, function(response){
        console.log(response)
        document.getElementById("comment").innerHTML = ""
        alert("Succesfully added!");
        window.location.reload();
    });

}

function getCommentsDetails() {
    console.log("intra in getCommentsDetails")
    var xmlhttp = new XMLHttpRequest();
    var element = document.getElementById("allergy-title");
    var allergy_name = element.getElementsByClassName("highlight")[0].innerHTML;
    path = "/comments" + allergy_name;
    console.log(path)
    xmlhttp.open("GET", path);
    xmlhttp.onreadystatechange = function () {
        console.log("intra in function")

        if (this.readyState === 4) {
            //console.log("intra in if")
            let responseJson = JSON.parse(this.response);
            for (const [key, value] of Object.entries(responseJson)) {
                var username = document.createElement("div");
                username.innerHTML = value[0]
                username.style.fontWeight = 'bold'
                document.getElementById("commentsfield").appendChild(username)


                var comm = document.createElement("div")
                comm.classList.add('box')
                comm.classList.add('wordwrap')
                comm.innerHTML = value[1]
                document.getElementById("commentsfield").appendChild(comm)

            }
        }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
