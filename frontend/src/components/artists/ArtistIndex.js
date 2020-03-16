import React from 'react'

import Navbar from '../common/Navbar'
import AudioHandler from '../common/AudioHandler'

class ArtistIndex extends React.Component {

  state = {}

  render() {
    return (
      <>
      <AudioHandler />
      <Navbar />
      <h1>The Artist Index</h1>
      </>
    )
  }
}

export default ArtistIndex