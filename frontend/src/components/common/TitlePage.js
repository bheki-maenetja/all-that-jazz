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
      <section className="hero is-fullheight is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1 has-text-centered">Welcome to the World of Jazz!</h1>
            <br />
            <div className="container">
              <div className="columns is-multiline">
                <div className="column is-one-quarter"></div>
                <div className="column is-one-quarter">
                  <Link to="/login">
                    <TitlePageCard name={'Login'} imageURL={LoginCardImg} />
                  </Link>
                </div>
                <div className="column is-one-quarter">
                  <Link to="/register">
                    <TitlePageCard name="Register" imageURL={RegisterCardImg} />
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