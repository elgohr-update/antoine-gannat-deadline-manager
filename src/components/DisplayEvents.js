import React, { Component } from 'react';
import '../assets/css/displayEvents.css';

export default class DisplayEvents extends Component {
  constructor() {
    super();
    this.state = {
      hovered: false,
      mousePosX: 0
    }
    // width of a day in pixels
    this.dayWidth = 10;
  }

  // timestamp convertion methods
  timestampToDays(timestamp) {
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

  getRemainingDays(event) {
    return (this.timestampToDays(event.endDate - new Date().getTime()));
  }

  getTotalDays(event) {
    return (this.timestampToDays(event.endDate - event.startDate));
  }

  getDaysBetween(date1, date2) {
    if (date1 > date2) {
      return (this.timestampToDays(date1) - this.timestampToDays(date2));
    } else {
      return (this.timestampToDays(date2) - this.timestampToDays(date1));
    }
  }

  getDateFromMousePos(earliestStartEvent){
    // convert pixels back to days
    const days = this.state.mousePosX / this.dayWidth;
    // convert days to ms
    const ms = days * 24 * 60 * 60 * 1000;
    return (this.timestampToDate(earliestStartEvent.startDate + ms));
  }

  mouseHoverMove(event) {
    const container = document.getElementsByClassName('progress-container')[0];
    const cursorAjustements = 10;
    this.setState({ mousePosX: event.clientX - cursorAjustements - container.getBoundingClientRect().x })
  }

  getProgressBarColor(totalDays, remainingDays){
    // if the event is finished
    if (remainingDays < 0){
      return ("green");
    }
    // if the event hasn't started yet
    if (remainingDays > totalDays){
      return ("orange");
    }
    // if its in progress
    return ("blue");
  }

  displayProgressBars(){
    const earliestStart = this.props.events[0];

    return (
      <div className="progress-container col-10"
      onMouseEnter={() => this.setState({ hovered: true })}
      onMouseLeave={() => this.setState({ hovered: false })}
      onMouseMove={(e) => { if (this.state.hovered) { this.mouseHoverMove(e) } }}>
        {
          this.state.hovered &&
          <div className="vertical-cursor" style={{ marginLeft: this.state.mousePosX + 'px' }}>
            <div className="bar"></div>
            <div className="date">
              {this.getDateFromMousePos(earliestStart)}
            </div>
          </div>
        }
      {
        this.props.events.map((event, index) => {
          const totalDays = this.getTotalDays(event);
          const remainingDays = this.getRemainingDays(event)
          return (
            <div className="progress"
              style={{ width: totalDays * this.dayWidth + "px", marginLeft: this.getDaysBetween(event.startDate, earliestStart.startDate) * this.dayWidth + "px" }}
              key={"progress-" + index}>
              <div className="progress-bar" role="progressbar"
                style={{ width: (totalDays - remainingDays) * this.dayWidth + "px", backgroundColor: this.getProgressBarColor(totalDays, remainingDays) }}
                aria-valuenow={remainingDays}
                aria-valuemin="0"
                aria-valuemax={totalDays}></div>
            </div>
          )
        })
      }
    </div>
    )
  }

  displayEvents() {
    if (!this.props.events || this.props.events.length === 0) {
      return (<p>No event yet, add one below.</p>)
    }
    // get the event that start the first (it is already sorted so its the first one)
    return (
      <section className="row">
        <div className="events-info-panel col-2">
          {
            this.props.events.map((event, index) => {
              return (
                <div key={index}>
                  {event.name}
                </div>
              )
            })
          }
        </div>
        {this.displayProgressBars()}
      </section>
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