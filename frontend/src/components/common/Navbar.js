import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component {

  state = { navbarOpen: false }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  logout = () => {
    this.setState({ navbarOpen: false })
  }

  render() {
    const { navbarOpen } = this.state
    return (
      <>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/home">Home</Link>
            <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/songs">Songs</Link>
              <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/artists">Artists</Link>
              <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/music-player">Music Player</Link>
              <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/my-profile">My Profile</Link>
              <Link className="navbar-item" onClick={this.logout} to="/">Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      </>
    )
  }
}

export default withRouter(Navbar)