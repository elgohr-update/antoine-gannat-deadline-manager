class Event
{
    constructor(name, begin, end)
    {
        this.name = name;
        this.begin = begin;
        this.end = end;
    }
};

class Storage
{
    constructor()
    {
        this.events = [];
        var eventsRaw = localStorage.getItem("events");
        if(eventsRaw && eventsRaw != "undefined")
        {
            var loadedEvents = JSON.parse(eventsRaw);
            if (loadedEvents)
                this.events = loadedEvents;    
        }
    }

    addEvent(newEvent)
    {
        if (this.events.map(function (e) { return e.name; }).indexOf(newEvent.name) !== -1)
        {
            alert("Event name already used");
            return;
        }
        this.events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(this.events));
    }

    getEvents()
    {
        if (!this.events)
            return ([]);
        return (this.events);
    }

    removeEvent(eventName)
    {
        var index = this.events.map(function (e) { return e.name; }).indexOf(eventName);
        if (index === -1)
        {
            alert("Unable to find the event, please retry");
            return;
        }
        this.events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(this.events));
    }
};