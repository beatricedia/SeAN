if(getCookie("seanData")){
    var globalData = JSON.parse(getCookie("seanData"))
    console.log(globalData)
    if(globalData){
        document.getElementById("commentDiv").style.display="block"
        document.getElementById("addDiv").style.display = "block"

    }
}

function getAllergyDetails() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/alergii");
    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4) {
            let responseJson = JSON.parse(this.response);
            selectedAllergy = responseJson[getCookie("selectedAllergy")];

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

            document.getElementById("container").appendChild(allergy_title);
            document.getElementById("container").appendChild(alergy_question);
            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
            try {
                if (selectedAllergy[8] != null && selectedAllergy[9] != null && selectedAllergy[10] != null && selectedAllergy[11] != null) {
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

                    var allergy_name = selectedAllergy[1];
                    let table = '<h2>Statistics of people who have ' + allergy_name + ' allergy per year</h1><table style="width:100%;  border: 2px solid #ddd;padding: 15px;  border-collapse: collapse;">';
                    table += '<tbody>';

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
                                pdf.save('report.pdf');
                            }, margins);
                    }
                    document.getElementById("container").appendChild(statistics);
                }

            } catch (e) { statistics.style.display = "none" }


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


            document.getElementById("container").appendChild(description);
            document.getElementById("container").appendChild(symptoms_title);
            document.getElementById("container").appendChild(symptoms_box);
            document.getElementById("container").appendChild(prevention_title);
            document.getElementById("container").appendChild(prevention_box);
            document.getElementById("container").appendChild(treatment_title);
            document.getElementById("container").appendChild(treatment_box);
            document.getElementById("container").appendChild(medication_title);
            document.getElementById("container").appendChild(medication_box);
            document.getElementById("container").appendChild(share);

            getCommentsDetails()
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
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
