import React, { Component } from 'react';
import '../assets/css/snackbar.css';

// Display a snackbar at the bottom of the screen
// props:
//    visible: boolean, show or hide the Snackbar
//    message: string, message to display
//    onAccept: callback, function called when the left button is called
//    onClose: callback, function called when the close button is pressed
//    btnText: string, text in the left button
export default class Snackbar extends Component {
  render() {
    return (
      <div className="snackbar">
        <div className={ this.props.visible ? "snackbar-content": "hide"}>
          <p>{this.props.message}</p>
          <button className="action-btn" onClick={this.props.onAccept}>{this.props.btnText}</button>
          <button className="float-right" onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    )
  }
}