import React, { Component } from 'react'
import moment from 'moment'
import './clock.css'

export default class Clock extends Component {

  state = {
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const m = moment()
      this.setState({
        hours: m.format('H'),
        minutes: m.format('mm'),
        seconds: m.format('ss'),
        dayOfWeek: m.format('dddd'),
        day: m.format('Do'),
        month: m.format('MMM'),
      })
    }, 1000)
  }

  render() {
    const {hours, minutes, seconds, dayOfWeek, day, month} = this.state
    const separatorOn = seconds % 2 === 0 ? 'separator-on' : 'separator-off';

    return (
      <div className="clock">
        <div className="time">
          <div className="hours">{hours}</div>
          <div className={"separator " + separatorOn}>:</div>
          <div className="minutes">{minutes}</div>
        </div>
        <div className="date">
          <div className="dayOfWeek">{dayOfWeek}</div>
          <div className="day">{day}</div>
          /
          <div className="month">{month}</div>
        </div>
      </div>
    )
  }

}
