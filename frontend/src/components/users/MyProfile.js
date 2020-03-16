import React from 'react'

import Navbar from '../common/Navbar'
import AudioHandler from '../common/AudioHandler'

class MyProfile extends React.Component {

  state = {}

  render() {
    return (
      <>
      <AudioHandler />
      <Navbar />
      <h1>My Profile Page</h1>
      </>
    )
  }
}

export default MyProfile