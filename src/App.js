import React, {Component} from 'react';
import AddEvent from './components/AddEvent';
import './assets/css/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
    if (localStorage.getItem("event-manager-events")){
      this.state.events = localStorage.getItem("event-manager-events")
    }
  }

  displayEvents() {
      return (
        <div>
          {this.state.events.map((event) => {
            return (
              <div key={event.id}>
                <p>{event.name}</p>
              </div>
              )
            }
          )}
        </div>
      )
  }

  render() {
    return (
      <main className="app">
        <h1>Event Manager!</h1>
        {this.displayEvents()}
        <hr/>
        <AddEvent/>
      </main>
    )
  }
}
