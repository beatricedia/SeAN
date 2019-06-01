if(getCookie("seanData")){
    var globalData = JSON.parse(getCookie("seanData"))
    console.log(globalData)
    if(globalData){
        document.getElementById("logoutDiv").style.display="block"
        document.getElementById("usernameDiv").innerHTML = globalData.username
        document.getElementById("usernameDiv").style.display = "block"
        document.getElementById("addAllergyDiv").style.display="block"
        document.getElementById("registerDiv").style.display="none"
        document.getElementById("loginDiv").style.display="none"
    }
}