import React, { Component } from 'react';

export default class DisplayEvents extends Component {

  displayEvents() {
    if (!this.props.events || this.props.events.length === 0){
      return (<p>No event yet, add one below.</p>)
    }
    return (
      <div>
        {
          this.props.events.map((event, index) => {
            return (
              <div key={index}>
                <p>{event.name}</p>
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
      <div>
        <h2>Events</h2>
        {this.displayEvents()}
      </div>
    )
  }

}