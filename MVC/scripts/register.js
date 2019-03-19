var expanded1 = false;

function showCheckboxes1() {
    var checkboxes1 = document.getElementById("checkboxes1");
    if (!expanded1) {
        checkboxes1.style.display = "block";
        expanded1 = true;
    } else {
        checkboxes1.style.display = "none";
        expanded1 = false;
    }
}

var expanded2 = false;

function showCheckboxes2() {
    var checkboxes2= document.getElementById("checkboxes2");
    if (!expanded2) {
        checkboxes2.style.display = "none";
        expanded2 = true;
    } else {
        checkboxes2.style.display = "block";
        expanded2 = false;
    }
}

var expanded3 = false;

function showCheckboxes3() {
    var checkboxes3= document.getElementById("checkboxes3");
    if (!expanded3) {
        checkboxes3.style.display = "none";
        expanded3 = true;
    } else {
        checkboxes3.style.display = "block";
        expanded3 = false;
    }
}