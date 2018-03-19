import React, { Component } from 'react'
import './test-status.css'
import ReleaseTestRuns from './data/release_testruns.json'
import sortBy from 'lodash/sortBy'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/'
import BeerCircle from './beer_circle.png'
import BeersCircle from './beers-circle.png'

const sortTestRuns = (testRuns) => {
  return sortBy(testRuns, 'test_set_name')
}
export default class TestStatus extends Component {

  state = {
    lastUpdated: null,
    testRuns: sortTestRuns(ReleaseTestRuns.results),
    releaseId: 183121,
  }

  getData = () => {
    const { releaseId } = this.state
    return fetch('https://app.qacomplete.smartbear.com/rest-api/service/api/v2/projects/100861/testruns?Filter=releaseid%3D'+releaseId, {
      credentials: 'no-cors'
    }).then(a => a.json())
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.getData().then( testRuns=> {
    //     this.setState({ testRuns })
    //   })
    // }, 60*1000)
  }


  render() {
    const sum = (arr, field) => arr.reduce((acc, a) => acc + a[field], 0)
    const { testRuns } = this.state
    const totalTests = sum(testRuns, 'nbr_tests')
    const totalAwaitingRun = sum(testRuns, 'nbr_awaiting_run')
    const totalRemaining = totalTests - totalAwaitingRun
    const percentage = Math.ceil(100 * (totalRemaining/totalTests))
    const finished = totalAwaitingRun == 0

    return (

      <div className="test-status">
        <div id="beermeter" >
          <div style={{ position: 'absolute', width: '100%' }}>
            <CircularProgressbar
              percentage={percentage}
              textForPercentage={null}
              />
            <div className="beer-status">
              { finished ? 'Huzzah!' : 'Soon...'}
            </div>
          </div>
          <div style={{ width: '100%', padding: '5%' }}>
            <img style={{ width: '90%' }} src={finished ? BeersCircle : BeerCircle} alt="beer" />
          </div>
        </div>

        { testRuns.map(({
          test_set_name,
          status_code,
          nbr_tests,
          nbr_passed,
          nbr_failed,
          nbr_blocked,
          nbr_awaiting_run,
          }) => {
            const haveRun = nbr_tests - nbr_awaiting_run
          return (
            <div className="test-status-run">
              <div className="title">
                {test_set_name}
              </div>
              <div className="status">
                {status_code}
                <span className="run">
                  {haveRun}/{nbr_tests}
                </span>
              </div>
              <div className="run">
              </div>
              <div className="details">
                <div className="detail passed">
                  Passed: <div className="count-wrapper"><div className="count">{nbr_passed}</div></div>
                </div>
                <div className="detail failed">
                  Failed: <div className="count-wrapper count-failed"><div className="count">{nbr_failed}</div></div>
                </div>
                <div className="detail blocked">
                  Blocked: <div className="count-wrapper count-blocked"><div className="count">{nbr_blocked}</div></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}
