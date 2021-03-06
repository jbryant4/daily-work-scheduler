// need function to populate page 
// need function to load page form local storage
// need function to save to local storage

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().hours();
// place date at the top of the page
$("#currentDay").append(currentDate);

function buildDay() {

    for (i = 9; i <= 17; i++) {

        var rowDiv = $('<div>');
        rowDiv.addClass("row time-block");
        rowDiv.attr("hour", i);

        var hourCol = $('<div>');
        hourCol.addClass("col-lg-2 hour");
        hourCol.text(i + ":00");

        var textCol = $('<textarea>');
        textCol.addClass("col-lg-9 description");
        textCol.attr("text-hour", i)
        textCol.attr("id", i);


        var btnCol = $('<button>');
        btnCol.addClass("col-lg-1 saveBtn");
        btnCol.attr("btn-hour", i);

        var saveIcon = $('<i>');
        saveIcon.addClass("fas fa-save");

        btnCol.append(saveIcon);

        rowDiv.append(hourCol);
        rowDiv.append(textCol);
        rowDiv.append(btnCol);

        $("#container").append(rowDiv);

        colorHours(rowDiv, i);
    }

    loadTask();
}

function loadTask() {

    var taskList = localStorage.getItem("taskList");
    if (taskList === null) {
        console.log("empty");
    } else {


        var taskList = JSON.parse(taskList);

        for (i = 0; i < taskList.length; i++) {
            var hourText = taskList[i].text;
            var hourIndex = taskList[i].index;

            $("#"+hourIndex).val(hourText);
        }
    }
}

function colorHours(rowDiv, i) {


    if (i < currentHour) {
        rowDiv.addClass("past");
    } else if (i > currentHour) {
        rowDiv.addClass("future");
    } else {
        rowDiv.addClass("present");
    }
}

$("#container").on("click", "button", function (event) {
    event.preventDefault();

    console.log(this)
    var hourIndex = $(this).attr("btn-hour");
    console.log(hourIndex)

    var hourText = $("#" + hourIndex).val().trim();
    console.log(hourText);

    saveText(hourIndex, hourText)
});


function saveText(hourIndex, hourText) {

    var taskList = localStorage.getItem("taskList");

    if (taskList === null) {

        var listObj = JSON.stringify([{ index: hourIndex, text: hourText }]);
        var taskList = localStorage.setItem("taskList", listObj);

    } else {

        taskList = JSON.parse(taskList);
        console.log(taskList)
        taskList.push({ index: hourIndex, text: hourText });
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }

}


buildDay();