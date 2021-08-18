import React, { Component } from 'react'
import moment from 'moment'
import './events.css'

export default class Clock extends Component {

  state = {
    lastUpdated: null,
    events: [
      {summary: 'SDES Daily Standup', start: moment('12:00', 'HH:mm')},
      {summary: 'on-prem standup', start: moment('12:30', 'HH:mm')},
      {summary: 'Done for the day', start: moment('18:15', 'HH:mm')},
    ]
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ lastUpdated: Date.now() })
    }, 60*1000)
  }

  render() {
    const { events } = this.state

    return (
      <div className="events">

        { events.map(({summary, start}) => {
          return (
            <div className="event">
              <div className="summary">
                {summary}
              </div>
              <div className="timeTill">
                {start.fromNow()}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}
