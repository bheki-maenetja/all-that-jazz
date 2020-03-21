import React from 'react'
import axios from 'axios'

import Authorize from '../../lib/authorize'

class MyProfile extends React.Component {

  state = {
    userData: {}
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({ userData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { userData } = this.state
    console.log(userData)
    return (
      <>
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="columns is-vcentered" style={{ height: '100%' }}>
          <div className="column is-one-quarter-desktop is-one-quarter-tablet is-full-mobile" style={{ borderRight: '1px solid lightgrey' }}>
            <aside className="menu">
              <div className="container has-text-centered" style={{ display: 'flex', justifyContent: 'center' }}>
              <figure className="image is-128x128">
                <img className="is-rounded" src={userData.profile_image} alt={`${userData.first_name} ${userData.last_name}`} />
              </figure>
              </div>
              <br />
              <h1 className="title is-1 has-text-centered">{userData.first_name + ' ' + userData.last_name}</h1>
              <h2 className="subtitle is-4 has-text-centered">{userData.alias}</h2>
              <hr />
              <p className="subtitle is-6">Username: {userData.username}</p>
              <p className="subtitle is-6">Email: {userData.email}</p>
              <div className="buttons">
                <button className="button is-warning is-fullwidth">Edit Profile</button>
                <button className="button is-info is-fullwidth">My Songs</button>
                <button className="button is-success is-fullwidth">My Playlists</button>
                <button className="button is-danger is-fullwidth">Create Playlist</button>
              </div>
            </aside>
          </div>
          <div className="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile">

          </div>
        </div>
      </section>
      </>
    )
  }
}

export default MyProfile