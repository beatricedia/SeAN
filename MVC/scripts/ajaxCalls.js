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

                var title = document.createElement("a");
                title.innerHTML = value[1];
                title.id = String(key);
                title.onclick = function () { setCookie('selectedAllergy', key, 1); }
                title.href = 'allergy.html';
                // http://127.0.0.1:39777/index.html#allergy?1

                var description = document.createElement("p");
                description.innerHTML = value[3];

                box.appendChild(title);
                box.appendChild(description);

                if (section)
                    section.appendChild(box);

                var allergy_name = value[1];
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


            html_report_option.addEventListener("click", function () {

                var filename = "report.html";
                download(filename, table);
            }, false);

            pdf_report_option.onclick = function () {

                var pdf = new jsPDF('p', 'pt', 'letter');
                console.log("intra in functie");
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
                        pdf.save('report  .pdf');
                    }, margins);
            }

        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function getAllergyDetails() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/alergii");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            let responseJson = JSON.parse(this.response);
            selectedAllergy = responseJson[getCookie("selectedAllergy")];

            var section = document.createElement("section");
            section.id = 'info';

            var container = document.createElement("div");
            container.classList.add('container');

            var allergy_title = document.createElement("h1");
            allergy_title.id = "allergy-title";

            var title = document.createElement("span");
            title.classList.add('highlight');
            title.innerHTML = selectedAllergy[1];

            allergy_title.appendChild(title);

            description = document.createElement("div");
            description.classList.add('box');
            description.innerHTML = selectedAllergy[3];

            var alergy_question = document.createElement("a");
            alergy_question.id = "title-description";
            alergy_question.innerHTML = "What is " + selectedAllergy[1] + " Allergy ?";

            var statistics = document.createElement("a");
            statistics.id = "statistics";
            statistics.innerHTML = "Statistics: "

            var html_report_option = document.createElement("a");
            html_report_option.innerHTML = "HTML";

            var pdf_report_option = document.createElement("a");
            pdf_report_option.innerHTML = "PDF";

            var allergy_reports = document.createElement("div");
            allergy_reports.id = "reports";

            allergy_reports.appendChild(html_report_option);
            allergy_reports.appendChild(pdf_report_option);
            statistics.appendChild(allergy_reports);

            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }

            var allergy_name = selectedAllergy[1];
            let table = '<h2>Statistics of people who have ' + allergy_name + ' allergy per year</h1><table style="width:100%;  border: 2px solid #ddd;padding: 15px;  border-collapse: collapse;">';
            table += '<tbody>';

            // var years = ["2005", "2006", "2009", "2012"];
            var years = selectedAllergy[8].split(",");
            var people = selectedAllergy[9].split(",");

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

            var age = selectedAllergy[10].split(",");
            var percent = selectedAllergy[11].split(",");

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
            table += '</table>';

            html_report_option.addEventListener("click", function () {

                var filename = "report.html";
                download(filename, table);
            }, false);

            pdf_report_option.onclick = function () {

                var pdf = new jsPDF('p', 'pt', 'letter');
                console.log("intra in functie");
                source = table
                specialElementHandlers = {
                    // element with id of "bypass" - jQuery style selector
                    '#bypassme': function (element, renderer) {
                        // true = "handled elsewhere, bypass text extraction"
                        return true
                    }
                };
                margins = {
                    top: 80,
                    bottom: 60,
                    left: 30,
                    width: 700
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
                        pdf.save('report  .pdf');
                    }, margins);
            }


            //Symptoms
            symptoms_title = document.createElement("p");
            symptoms_title.classList.add('info-title');
            symptoms_title.innerHTML = "Symptoms:";

            symptoms_box_text = document.createElement("p");
            symptoms_box_text.innerHTML = selectedAllergy[4];

            symptoms_box = document.createElement("div");
            symptoms_box.classList.add('box');
            symptoms_box.appendChild(symptoms_box_text);

            //Prevention
            prevention_title = document.createElement("p");
            prevention_title.classList.add('info-title');
            prevention_title.innerHTML = "Prevention:";

            prevention_box_text = document.createElement("p");
            prevention_box_text.innerHTML = selectedAllergy[5];

            prevention_box = document.createElement("div");
            prevention_box.classList.add('box');
            prevention_box.appendChild(prevention_box_text);

            //Treatment
            treatment_title = document.createElement("p");
            treatment_title.classList.add('info-title');
            treatment_title.innerHTML = "Treatment:";

            treatment_box_text = document.createElement("p");
            treatment_box_text.innerHTML = selectedAllergy[6];

            treatment_box = document.createElement("div");
            treatment_box.classList.add('box');
            treatment_box.appendChild(treatment_box_text);

            //Medication
            medication_title = document.createElement("p");
            medication_title.classList.add('info-title');
            medication_title.innerHTML = "Medication:";

            medication_box_text = document.createElement("p");
            medication_box_text.innerHTML = selectedAllergy[7];

            medication_box = document.createElement("div");
            medication_box.classList.add('box');
            medication_box.appendChild(medication_box_text);

            var share = document.createElement("div");
            share.innerHTML = `<p class="share" title="Share on Facebook" onclick="shareOnFb()">
                <i class="fas fa-share" id="shareBtn"></i> Share on <i class="fab fa-facebook"></i>
                </p>`

            var Pspatii = document.createElement("div");
            Pspatii.innerHTML = "&#10&#10&#10&#10&#10&#10&#10&#10&#10&#10"

            container.appendChild(allergy_title);
            container.appendChild(alergy_question);
            container.appendChild(statistics);
            container.appendChild(description);
            container.appendChild(symptoms_title);
            container.appendChild(symptoms_box);
            container.appendChild(prevention_title);
            container.appendChild(prevention_box);
            container.appendChild(treatment_title);
            container.appendChild(treatment_box);
            container.appendChild(medication_title);
            container.appendChild(medication_box);
            container.appendChild(share);

            section.appendChild(container);
            document.body.appendChild(section);


        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
//
//function showAllergies() {
//    getAllergies("../cgi-bin/getAllAlergies.py");
//}
//
//function showAllergyDetails() {
//    getAllergyDetails("../cgi-bin/getAllAlergies.py");
//}