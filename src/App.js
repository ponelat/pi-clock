import React, { Component } from 'react';
import './App.css'
import moment from 'moment'
import Clock from './clock'
import Events from './events'
import TestStatus from './test-status'
import PiLogo from './pi-logo.svg'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Clock />
        <Events />
        <img id="pi-logo" alt="" src={PiLogo}/>
      </div>
    );
  }
}


export default App;
