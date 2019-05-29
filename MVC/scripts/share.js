function shareOnFb(){
    var selectedAllergy = getCookie('selectedAllergy')
    if(!selectedAllergy){
        alert("eroare");
        return;
    }
    console.log(selectedAllergy)
    var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + "http://127.0.0.1:4034/alergie"+selectedAllergy, 'facebook-popup', 'height=350,width=600');
    if(facebookWindow.focus) { facebookWindow.focus(); }
      return false;
}
