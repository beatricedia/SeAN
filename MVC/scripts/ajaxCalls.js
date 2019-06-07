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

            var html_report_option = document.createElement("a");
            // html_report_option.href = "statistics.html"
            // html_report_option.attributes = "download"
            html_report_option.innerHTML = "HTML";
            // html_report_option.innerHTML =  `<a href = "statistics.html" download>HTML</a>`

            var pdf_report_option = document.createElement("a");
            pdf_report_option.innerHTML = "PDF";

            var allergy_reports = document.createElement("div");
            allergy_reports.id = "reports";
            allergy_reports.appendChild(html_report_option);
            allergy_reports.appendChild(pdf_report_option);

            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
        
                element.style.display = 'none';
                document.body.appendChild(element);
        
                element.click();
        
                document.body.removeChild(element);
            }
        

            html_report_option.addEventListener("click", function () {
                // Generate download of hello.txt file with some content

                var body = document.getElementsByTagName('body')[0];

                var allergy_name = "Pollen"
                let table = '<h2>Statistics of people who have ' + allergy_name + ' allergy per year</h1><table style="width:100%;  border: 2px solid #ddd;padding: 15px;  border-collapse: collapse;">';
                table += '<tbody>';

                var years = ["2005", "2006", "2009", "2012"];
                var people = ["20", "22", "30", "35"];

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

                var filename = "hello.html";

                download(filename, table);
            }, false);

            // pdf_report_option.onclick = function () {
            //     var doc = new jsPDF();
            //     console.log("intra in functie");
            //     var years = selectedAllergy[4].split(",");
            //     var table1 = document.createElement("table");
            //     table1.id = "years-table"
            //     var tr = document.createElement("tr");
            //     var th = document.createElement("th");
            //     th.innerHTML = "Years";
            //     tr.appendChild(th);
            //     for(i=0; i<years.length; i++){
            //         th.innerHTML = years[i];
            //         console.log(years[i])
            //         tr.appendChild(th);
            //     }
            //     table1.appendChild(tr);

            //     var res = doc.autoTableHtmlToJson(document.getElementById("years-table"));
            //     doc.autoTable(res.columns, res.data, { margin: { top: 80 } });

            //     var header = function (data) {
            //         doc.setFontSize(18);
            //         doc.setTextColor(40);
            //         doc.setFontStyle('normal');
            //         //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
            //         doc.text("Testing Report", data.settings.margin.left, 50);
            //     };

            //     var options = {
            //         beforePageContent: header,
            //         margin: {
            //             top: 80
            //         },
            //         startY: doc.autoTableEndPosY() + 20
            //     };

            //     doc.autoTable(res.columns, res.data, options);

            //     doc.save("table.pdf");

            // }



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
            container.appendChild(allergy_reports);
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