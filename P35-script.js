function getHistory() {
    return document.getElementById("history-value").innerHTML;
}
function printHistory(num) {
    document.getElementById("history-value").innerHTML = num;
}
function getOutput() {
    return document.getElementById("output-value").innerHTML;
}
function printOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerHTML = num;
    }
    else {
       document.getElementById("output-value").innerHTML = getFormattedNumber(num);
    }
}
function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {//if output has value
                output = output.slice(0, output.length - 1);
                printOutput(output);
            }
        }
        else {
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {  //returns true if the argument is NOT a number. eg. 5*
                    history = history.substr(0, history.length - 1); // removes the last operator
                }
            }
            if (output != "" || history !="") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var reult = eval(history);
                    printOutput(reult);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory("history");
                    printOutput("");
                }
            }
        }
    });
}
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        //if output is a number
        if (output != NaN) {
            output = output + this.id;
            printOutput("output");
        }
    });
};