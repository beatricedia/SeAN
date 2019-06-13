function search() {
    var searchPattern = document.getElementById("searchInput").value
    if (searchPattern == "Search..." || searchPattern == "")
        return
    var ok = true;
    var contor = 1;
    while (ok) {
        element = document.getElementById("" + contor)
        if (!element) {
            ok = false
            break
        }
        htmeleu = (element.innerText || element.textContent).replace("Allergy", "").replace("Symptoms", "").replace("Prevention", "")
        if (htmeleu.indexOf(searchPattern) == -1)
            element.style.display = 'none'
        else {
            element.style.display = 'block'
        }

        contor++
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (getCookie("seanData")) {
    var globalData = JSON.parse(getCookie("seanData"))
    /*Notificari*/
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/notificari" + JSON.parse(getCookie("seanData")).id);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log(this.response)
            var notificari = JSON.parse(this.response)
            console.log(notificari)
            for (var indexNot in notificari) {
                var notificare = notificari[indexNot]
                if (notificare[3] == 1 && globalData.notificare1)
                    alert(notificare[2])
                if (notificare[3] == 2 && globalData.notificare2)
                    alert(notificare[2])
                if (notificare[3] == 3 && globalData.notificare3)
                    alert(notificare[2])
            }
        }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    if (globalData) {
        document.getElementById("logoutDiv").style.display = "block"
        document.getElementById("usernameDiv").innerHTML = globalData.username
        document.getElementById("usernameDiv").style.display = "block"
        document.getElementById("addAllergyDiv").style.display = "block"
        document.getElementById("registerDiv").style.display = "none"
        document.getElementById("loginDiv").style.display = "none"
        document.getElementById("profileDiv").style.display = "block"
        document.getElementById("feedbackDiv").style.display = "block"
        document.getElementById("suggestionsDiv").style.display = "block"
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

function logout() {
    setCookie("seanData", undefined, 1)
    window.location.replace("/")
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slides[slideIndex - 1])
        slides[slideIndex - 1].style.display = "block";
}

function menuBars() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getAllergiess() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/alergii");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            let responseJson = JSON.parse(this.response);
            var html_report_option = document.getElementById("html");
            var pdf_report_option = document.getElementById("pdf");

            let table = '<h1 style="text-align:center; color:#e63900;"  >Statistics for all allergies</h1><br>'

            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }

            for (const [key, value] of Object.entries(responseJson)) {
                var section = document.getElementById("news");
                if (section)
                    section.classList.add('w80p');

                var box = document.createElement("div");
                box.classList.add('box');
                box.id = String(key)

                var title = document.createElement("a");
                title.innerHTML = value[1];
                title.onclick = function () { setCookie('selectedAllergy', key, 1); }
                title.href = 'allergy.html';
                
                var description = document.createElement("p");
                description.innerHTML = value[3];

                box.appendChild(title);
                box.appendChild(description);

                if (section)
                    section.appendChild(box);

                var allergy_name = value[1];
                try {
                    if (value[8] != null && value[9] != null && value[10] != null && value[11] != null) {
                        table += '<h2 style="color: #992600;">Statistics of people who have ' + allergy_name + ' allergy per year</h1><table style="width:100%;  border: 2px solid #ddd;padding: 15px;  border-collapse: collapse;">';
                        table += '<tbody>';
                        var years = value[8].split(",");
                        var people = value[9].split(",");

                        for (var i = 0; i < 2; i++) {
                            table += '<tr>';
                            for (var j = -1; j < years.length; j++) {

                                if (j == -1) {
                                    if (i == 0) {

                                        table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Years</td>';
                                    }
                                    else if (i == 1) {

                                        table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">People</td>';
                                    }
                                }
                                else {
                                    if (i == 0) {

                                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${years[j]}</td>`;
                                    }
                                    else {

                                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${people[j]}</td>`;
                                    }
                                }
                            }

                            table += '</tr>';
                        }

                        table += '</tbody>';
                        table += '</table>';

                        var age = value[10].split(",");
                        var percent = value[11].split(",");

                        table += '<br><br><h2>Age statistics for 2019</h1><table style="width:100%;  border: 2px solid #ddd;padding: 15px;  border-collapse: collapse;">'
                        for (var i = 0; i < 2; i++) {
                            table += '<tr>';
                            for (var j = -1; j < age.length; j++) {

                                if (j == -1) {
                                    if (i == 0) {

                                        table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Age</td>';
                                    }
                                    else if (i == 1) {

                                        table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Percent</td>';
                                    }
                                }
                                else {
                                    if (i == 0) {

                                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${age[j]}</td>`;
                                    }
                                    else {

                                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${percent[j]} %</td>`;
                                    }
                                }
                            }

                            table += '</tr>';
                        }
                        table += '</tbody>';
                        table += '</table><br><br>';
                    }
                } catch (e) { statistics.style.display = "none" }
            }


            html_report_option.addEventListener("click", function () {

                var filename = "report.html";
                download(filename, table);
            }, false);

            pdf_report_option.onclick = function () {

                var pdf = new jsPDF('p', 'pt', 'letter');
                source = table
                specialElementHandlers = {
                    // element with id of "bypass" - jQuery style selector
                    '#bypassme': function (element, renderer) {
                        // true = "handled elsewhere, bypass text extraction"
                        return true
                    }
                };
                margins = {
                    top: 10,
                    bottom: 100,
                    left: 30,
                    width: 500
                };
                // all coords and widths are in jsPDF instance's declared units
                // 'inches' in this case
                pdf.fromHTML(
                    source, // HTML string or DOM elem ref.
                    margins.left, // x coord
                    margins.top, { // y coord
                        'width': margins.width, // max width of content on PDF
                        'elementHandlers': specialElementHandlers
                    },

                    function (dispose) {
                        // dispose: object with X, Y of the last line add to the PDF 
                        //          this allow the insertion of new lines after html
                        pdf.save('report.pdf');
                    }, margins);
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}



