import React from 'react'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {

  state = {}

  render() {
    return (
      <>
      <div className="hero is-info home-page" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="hero-body columns is-vcentered">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-centered">All That Jazz</h1>
            <h2 className="subtitle is-3 has-text-centered">Your only place for the finest jazz music in all the world</h2>
            <Link to="/songs">
              <button className="button is-link has-text-warning is-large animated tada normal delay-3s">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default HomePage