import React, { Component } from 'react';
// Datepicker component
import DatePicker from "react-datepicker";
// Notification component
import { store } from 'react-notifications-component';
// Page style
import '../assets/css/addEvent.css';
// Datepicker style
import "react-datepicker/dist/react-datepicker.css";

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    let now = new Date()
    now.setHours(0, 0, 0, 0);
    this.state = {
      startDate: now,
      endDate: null,
      name: ""
    }
  }

  createEvent(e) {
    e.preventDefault();
    if (!this.state
      || !this.state.name || this.state.name.length === 0
      || !this.state.endDate || !this.state.startDate) {
      store.addNotification({
        title: "Missing parameter",
        message: "Please fill every field.",
        type: "danger",
        container: "top-right",
        dismiss: {
          duration: 5000
        }
      });
      return;
    }
    console.log(this.state.startDate)
    console.log(this.state.endDate)
    this.props.onAdd({
      name: this.state.name,
      startDate: new Date(this.state.startDate).getTime(),
      endDate: new Date(this.state.endDate).getTime()
    })
  }

  // New event form
  render() {
    return (
      <div>
        <form className="add-event-form">
          <div className="form-group">
            <label htmlFor="input-event-name">Event's name</label>
            <input type="text" className="form-control" onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" id="input-event-name" autoComplete="off" />
          </div>
          <div className="form-group">
            <label htmlFor="input-event-date-begin">Start date</label>
            <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date })} id="input-event-date-begin" autoComplete="off" />
          </div>
          <div className="form-group">
            <label htmlFor="input-event-date-end">End date</label>
            <DatePicker selected={this.state.endDate} onChange={(date) => this.setState({ endDate: date })} id="input-event-date-end" autoComplete="off" />
          </div>
          <button className="btn btn-primary" onClick={this.createEvent.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }

}