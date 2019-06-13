function getGeneralStatisticsHTML() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/gender-statistics");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            let responseJson = JSON.parse(this.response);
            let table = '<h1 style="text-align:center; color:#e63900;"  >Gender statistics</h1><br>';
            table += '<table style="width:100%;  border: 2px solid #ddd;padding: 15px;  border-collapse: collapse;">';
            table += '<tbody>';
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
                if (key == 1) {
                    var femaleList = value;
                }
                else
                    var maleList = value;
            }
            for (var i = 0; i < femaleList.length + 1; i++) {
                table += '<tr>';
                for (var j = 0; j < 3; j++) {
                    if (i == 0) {
                        if (j == 0) {
                            table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Allergy</td>';
                        }
                        else if (j == 1) {
                            table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Females</td>';
                        }
                        else if (j == 2) {
                            table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Males</td>';
                        }
                    }
                    else if (j == 0) {
                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${femaleList[i - 1][0]}</td>`;
                    }
                    else if (j == 1) {
                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${femaleList[i - 1][1]}</td>`;
                    }
                    else if (j == 2) {
                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${maleList[i - 1][1]}</td>`;
                    }
                }
                table += '</tr>';
            }
            table += '</tbody>';
            table += '</table>';
            var filename = "gender-report.html";
            download(filename, table);
        }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function getGeneralStatisticsPDF() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/gender-statistics");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            let responseJson = JSON.parse(this.response);
            let table = '<h1 style="text-align:center; color:#e63900;"  >Gender statistics</h1><br>';
            table += '<table style="width:100%;  border: 2px solid #ddd;padding: 15px;  border-collapse: collapse;">';
            table += '<tbody>';
            for (const [key, value] of Object.entries(responseJson)) {
                if (key == 1) {
                    var femaleList = value;
                }
                else
                    var maleList = value;
            }
            for (var i = 0; i < femaleList.length + 1; i++) {
                table += '<tr>';
                for (var j = 0; j < 3; j++) {
                    if (i == 0) {
                        if (j == 0) {
                            table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Allergy</td>';
                        }
                        else if (j == 1) {
                            table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Females</td>';
                        }
                        else if (j == 2) {
                            table += '<td style="border: 2px solid #ddd;padding: 8px;  background-color: #b2b2b2;">Males</td>';
                        }
                    }
                    else if (j == 0) {
                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${femaleList[i - 1][0]}</td>`;
                    }
                    else if (j == 1) {
                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${femaleList[i - 1][1]}</td>`;
                    }
                    else if (j == 2) {
                        table += `<td style="border: 2px solid #ddd;padding: 8px;">${maleList[i - 1][1]}</td>`;
                    }
                }
                table += '</tr>';
            }
            table += '</tbody>';
            table += '</table>';
            var pdf = new jsPDF('p', 'pt', 'letter');
            source = table
            specialElementHandlers = {
                '#bypassme': function (element, renderer) {
                    return true
                }
            };
            margins = {
                top: 80,
                bottom: 60,
                left: 30,
                width: 700
            };
            pdf.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, { // y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': specialElementHandlers
                },
                function (dispose) {
                    pdf.save('gender-report.pdf');
                }, margins);
        }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
