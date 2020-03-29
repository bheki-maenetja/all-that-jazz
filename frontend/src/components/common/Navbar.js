import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Authorize from '../../lib/authorize'

class Navbar extends React.Component {

  state = { navbarOpen: false }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  handleLogOut = () => {
    Authorize.logout()
    this.setState({ navbarOpen: false })
    const { logout } = this.props
    logout()
  }

  render() {
    const { navbarOpen } = this.state
    return (
      <>
      <nav className="navbar is-warning">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item has-text-link" onClick={() => this.setState({ navbarOpen: false })} to="/home"><i className="fas fa-home fa-2x"></i></Link>
            <a className={`navbar-burger has-text-link ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active has-background-link' : ''}`}>
            <div className="navbar-end">
              <Link className={`navbar-item is-size-4  ${navbarOpen ? 'has-text-warning' : 'has-text-link'}`} onClick={() => this.setState({ navbarOpen: false })} to="/songs">Songs</Link>
              <Link className={`navbar-item is-size-4  ${navbarOpen ? 'has-text-warning' : 'has-text-link'}`} onClick={() => this.setState({ navbarOpen: false })} to="/artists">Artists</Link>
              <Link className={`navbar-item is-size-4  ${navbarOpen ? 'has-text-warning' : 'has-text-link'}`} onClick={() => this.setState({ navbarOpen: false })} to="/my-profile">My Profile</Link>
              <Link className={`navbar-item is-size-4  ${navbarOpen ? 'has-text-warning' : 'has-text-link'}`} onClick={this.handleLogOut} to="/">Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      </>
    )
  }
}

export default withRouter(Navbar)