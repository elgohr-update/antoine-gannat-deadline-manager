import React, { Component } from 'react';
import Snackbar from './Snackbar';
import * as serviceWorker from '../serviceWorker';

// Register the service worker and display a refresh button if new content is found
export default class ServiceWorker extends Component {
  constructor(props) {
    super(props);
    // set the component state
    this.state = {
      visible: false,
      registrationWaiting: null
    }
  }

  // register the service worker on mount
  componentDidMount(){
    // register the service worker
    serviceWorker.register({
      onUpdate: this.onUpdate.bind(this)
    });
  }
  // unregister the service worker on unmount
  componentWillUnmount(){
    serviceWorker.unregister();
  }

  // if an update is found, display a snackbar to refresh the page
  onUpdate(reg){
    this.setState({registrationWaiting: reg.waiting, visible: true});
  }

  // load updated content and refresh the page 
  getNewContent() {
    // hide the snackbar
    this.setState({visible: false});
    // if the registration is found
    if (this.state.registrationWaiting) {
      // switch the service worker to 'active'
      // forcing it to get new content uppon next refresh
      this.state.registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
      // once the message has been processed, refresh the page
      this.state.registrationWaiting.addEventListener('statechange', e => {
        if (e.target.state === 'activated') {
          // refresh
          window.location.reload();
        }
      })
    }
    else{
      console.error("No new content found.")
    }
  }
  render() {
    return (
      <div>
        <Snackbar
          visible={this.state.visible}
          btnText="Refresh"
          message="New content available !"
          onAccept={this.getNewContent.bind(this)}
          onClose={() => this.setState({visible:false})}/>
      </div>
    )
  }
}