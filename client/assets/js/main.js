var storage = new Storage();

function displayEvents() {
    var timeNow = Math.floor(new Date().getTime() / 1000);
    var eventsContainer = document.getElementById("eventsContainer")
    eventsContainer.innerHTML = "";
    var events = storage.getEvents();

    events.forEach(event => {
        var container = $("<div>").addClass("row col-lg-12").css('margin', '5px').appendTo(eventsContainer);
        //add progress bar title
        $("<h4>").addClass("col-lg-12 text-center").append(event.name).appendTo(container);
        //add progress bar container
        var progressBarContainer = $("<div>").addClass("progress col-lg-11").css("height", "16px").appendTo(container);
        var beginTime = Math.floor(new Date(event.begin).getTime() / 1000); 
        var endTime = Math.floor(new Date(event.end).getTime() / 1000); 
        var duration = endTime - beginTime;
        var timeDifference = (100 * (timeNow - beginTime)) / duration;

        //add progress bar
        var progressBar = $("<div>").addClass("progress-bar progress-bar-striped progress-bar-animated").appendTo(progressBarContainer);
        progressBar.attr('role', "progressbar");
        progressBar.attr('aria-valuenow', timeDifference).css('width', timeDifference + "%");
        progressBar.attr('aria-valuemin', 0);
        progressBar.attr('aria-valuemax', 100);
        progressBar.append(timeDifference.toFixed(2) + "%");


        var progressBarDelete = $("<button>").addClass("btn btn-danger col-lg-1").appendTo(container);
        progressBarDelete.append('<i class="fas fa-trash-alt"></i>');
        progressBarDelete.attr('onclick', 'deleteEvent("' + event.name + '")');
    });
}

function addNewEvent() {
    var eventName = document.getElementById("newEventName").value;
    var eventBegin = document.getElementById("newEventBegin").value;
    var eventEnd = document.getElementById("newEventEnd").value;

    if (!eventName || !eventBegin || !eventEnd)
    {
        alert("Please fill all the fields");
        return;
    }
    storage.addEvent(new Event(eventName, eventBegin, eventEnd));
    displayEvents();
}

function deleteEvent(eventName)
{
    storage.removeEvent(eventName);
    displayEvents();
}

displayEvents();

setInterval(displayEvents, 1000);