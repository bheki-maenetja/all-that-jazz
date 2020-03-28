import React from 'react'
import { Link } from 'react-router-dom' 

import TitlePageCard from './TitlePageCard'

import LoginCardImg from '../../assets/login-card-img.png'
import RegisterCardImg from '../../assets/register-card-img.jpg'

class TitlePage extends React.Component {

  state = {}

  render() {
    return (
      <>
      <section className="hero is-fullheight is-info" style={{ backgroundImage: `url(https://media.giphy.com/media/ukk70PDTAXmRa/giphy.gif)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-body">
          <div className="container" style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '25px', width: 'fit-content' }}>
            <h1 className="title is-1 has-text-centered">Welcome to the World of Jazz!</h1>
            {/* <br /> */}
            <div className="container">
              <div className="columns is-multiline">
                <div className="column is-one-quarter"></div>
                <div className="column is-one-quarter">
                  <Link to="/login">
                    <button className="button is-primary is-fullwidth is-large">Login</button>
                  </Link>
                </div>
                <div className="column is-one-quarter">
                  <Link to="/register">
                    <button className="button is-info is-fullwidth is-large">Register</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default TitlePage