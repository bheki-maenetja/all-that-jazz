import React from 'react'
import { Link } from 'react-router-dom'

class ErrorPage extends React.Component {

  state = {}

  render() {
    return (
      <>
      <div className="hero is-info" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="hero-body columns is-vcentered">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-centered">Whoops!!!</h1>
            <h2 className="subtitle is-3 has-text-centered">Looks like you're in the wrong place</h2>
            <Link to="/home">
              <button className="button is-warning is-large">Go back</button>
            </Link>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default ErrorPage