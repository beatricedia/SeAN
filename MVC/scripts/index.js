function search(){
    var searchPattern = document.getElementById("searchInput").value
    if(searchPattern == "Search..." || searchPattern == "")
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
        document.getElementById("logoutDiv").style.display="block"
        document.getElementById("usernameDiv").innerHTML = globalData.username
        document.getElementById("usernameDiv").style.display = "block"
        document.getElementById("addAllergyDiv").style.display="block"
        document.getElementById("registerDiv").style.display="none"
        document.getElementById("loginDiv").style.display="none"
        document.getElementById("profileDiv").style.display="block"
    }
}


  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function logout(){
    setCookie("seanData", undefined, 1)
    window.location.reload()
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    if(slides[slideIndex-1])
        slides[slideIndex-1].style.display = "block";
  }

  function menuBars() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }


