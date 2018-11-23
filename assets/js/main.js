var storage = new Storage();

function displayEvents() {
    //display current time
    document.getElementById("timeNow").innerHTML = new Date();
    //get current time
    var timeNow = Math.floor(new Date().getTime() / 1000);
    var eventsContainer = document.getElementById("eventsContainer")
    // clear the container
    while (eventsContainer.firstChild) {
        eventsContainer.removeChild(eventsContainer.firstChild);
    }
    // get the events from the storage
    var events = storage.getEvents();

    events.forEach(event => {
        var container = $("<div>").addClass("row col-lg-12").css('margin', '5px').appendTo(eventsContainer);

        //convert the time from the event to a date
        var beginTime = new Date(event.begin);
        beginTime = new Date(beginTime.getFullYear(), beginTime.getMonth(), beginTime.getDate() + 1,0,0,0).getTime() / 1000;
        var endTime = new Date(event.end);
        endTime = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate() + 1,0,0,0).getTime() / 1000;

        //calculate duration of the event
        var duration = endTime - beginTime;

        //add progress bar title
        $("<h4>").addClass("col-lg-12 text-center").append(event.name).appendTo(container);

        var timeLeft = ((endTime - timeNow));
        var daysLeft = Math.floor(timeLeft / (3600*24));
        timeLeft -= daysLeft*3600*24;
        var hoursLeft   = Math.floor(timeLeft / 3600);
        timeLeft  -= hoursLeft*3600;
        var minutesLeft = Math.floor(timeLeft / 60);
        timeLeft  -= minutesLeft*60;
        var secondsLeft= timeLeft;

        //add time left
        $("<b>").addClass("col-lg-12").append(daysLeft + " day(s) " + hoursLeft + " hour(s) " + minutesLeft + " minutes " + secondsLeft + " seconds").appendTo(container);

        //display dates
        //begin
        $("<i>").addClass("col-lg-6").append(event.begin).appendTo(container);
        //end
        $("<i>").addClass("col-lg-6 text-right").append(event.end).appendTo(container);
        
        //add progress bar container
        var progressBarContainer = $("<div>").addClass("progress col-lg-11").css("height", "16px").appendTo(container);

        //calculate the time spent as a percentage
        var timeSpentInPercentage = (100 * (timeNow - beginTime)) / duration;

        //add progress bar
        var progressBar = $("<div>").addClass("progress-bar progress-bar-striped progress-bar-animated").appendTo(progressBarContainer);
        progressBar.attr('role', "progressbar");
        progressBar.attr('aria-valuenow', timeSpentInPercentage).css('width', timeSpentInPercentage + "%");
        progressBar.attr('aria-valuemin', 0);
        progressBar.attr('aria-valuemax', 100);
        progressBar.append(timeSpentInPercentage.toFixed(3) + "%");

        //add delete button
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