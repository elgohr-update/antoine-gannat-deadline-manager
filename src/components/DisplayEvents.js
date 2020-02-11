import React, { Component } from 'react';
import '../assets/css/displayEvents.css';

export default class DisplayEvents extends Component {
  constructor(){
    super();
    this.state = {
    };
  }

  // timestamp convertion methods
  timestampToDays(timestamp){
    // divide by 1000: milliseconds to seconds
    // divide by 60: seconds to minutes
    // divide by 60: minutes to hours
    // divide by 24: hours to days
    return (Math.round(timestamp / 1000 / 60 / 60 / 24));
  }

  // convert timestamp to date (dd/mm/yyyy)
  timestampToDate(timestamp) {
    const date = new Date(timestamp);
    return ((date.getDate() < 10 ? '0' : '') + date.getDate() + '/' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear());
  }

  getRemainingDays(event){
    return (this.timestampToDays(event.endDate - new Date().getTime()));
  }

  getTotalDays(event){
    return (this.timestampToDays(event.endDate - event.startDate));
  }

  displayEvents() {
    if (!this.props.events || this.props.events.length === 0){
      return (<p>No event yet, add one below.</p>)
    }
    return (
      <div>
        {
          this.props.events.map((event, index) => {
            const totalDays = this.getTotalDays(event);
            const remainingDays = this.getRemainingDays(event)
            return (
              <div className="event" key={index} style={{minWidth: totalDays * 10 + "px"}}>
                <div className="row">
                  <label className="col">{this.timestampToDate(event.startDate)}</label>
                  <label className="float-right">{this.timestampToDate(event.endDate)}</label>
                </div>
                <div className="row">
                  <span className="event-name">{event.name}</span>
                  <div className="progress " style={{width: totalDays * 10 + "px"}}>
                    <div className="progress-bar" role="progressbar"
                      style={{width: (totalDays - remainingDays) * 10 + "px"}}
                      aria-valuenow={remainingDays}
                      aria-valuemin="0"
                      aria-valuemax={totalDays}></div>
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => this.props.onEventRemove(index)}>Remove</button>
              </div>
            )
          })
        }
      </div>
    )
  }
  // New event form
  render() {
    return (
      <div className="events-container">
        <h2>Events</h2>
        {this.displayEvents()}
      </div>
    )
  }

}