import React, { Component } from 'react';
import AddEvent from './components/AddEvent';
import DisplayEvents from './components/DisplayEvents';
import './assets/css/app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      events: localStorage.getItem('event-manager-events') ? JSON.parse(localStorage.getItem('event-manager-events')) : []
    }
  }

  // remove an event
  onEventRemove(eventId) {
    // Get the current events
    let events = this.state.events;
    // Remove the event
    events.splice(eventId, 1);
    // update the state
    this.setState({ events: events });
    // Update the localstorage
    localStorage.setItem('event-manager-events', JSON.stringify(events));
  }

  // add an event
  onEventAdd(newEvent) {
    // Get the current events
    let events = this.state.events;
    // Add the new event
    events.push(newEvent);
    // update the state
    this.setState({ events: events });
    // Update the localstorage
    localStorage.setItem('event-manager-events', JSON.stringify(events));
  }

  render() {
    return (
      <main className="app">
        <h1>Deadline Manager</h1>
        <DisplayEvents events={this.state.events} onEventRemove={this.onEventRemove.bind(this)} />
        <AddEvent onAdd={this.onEventAdd.bind(this)} />
      </main>
    )
  }
}
