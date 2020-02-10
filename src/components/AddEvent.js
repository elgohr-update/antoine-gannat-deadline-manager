import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import '../assets/css/addEvent.css';
import "react-datepicker/dist/react-datepicker.css";

export default class AddEvent extends Component {
  constructor(props){
    super(props);
    this.state ={
      startDate: null,
      endDate: null,
      name: ""
    }
  }

  createEvent(e){
    e.preventDefault();
    this.props.onAdd(this.state)
  }

  // New event form
  render() {
    return (
      <div>
        <h2>Add an event</h2>
        <form className="add-event-form">
          <div className="form-group">
            <label htmlFor="input-event-name">Event's name</label>
            <input type="text" className="form-control" onChange={(e) => this.setState({name: e.target.value})} placeholder="Name" id="input-event-name" />
          </div>
          <div className="form-group">
            <label htmlFor="input-event-date-begin">Start date</label>
            <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} id="input-event-date-begin"/>
          </div>
          <div className="form-group">
            <label htmlFor="input-event-date-end">End date</label>
            <DatePicker selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} id="input-event-date-end"/>
          </div>
          <button className="btn btn-primary" onClick={this.createEvent.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }

}