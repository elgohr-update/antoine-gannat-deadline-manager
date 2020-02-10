import React, { Component } from 'react';
import '../assets/css/addEvent.css';

export default class AddEvent extends Component {
  // New event form
  render() {
    return (
      <form className="add-event-form">
        <div className="form-group">
          <label htmlFor="input-event-name">Event's name</label>
          <input type="text" className="form-control" placeholder="Name" id="input-event-name" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    )
  }

}