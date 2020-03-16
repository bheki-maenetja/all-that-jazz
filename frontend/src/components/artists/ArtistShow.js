import React from 'react'

import Navbar from '../common/Navbar'
import AudioHandler from '../common/AudioHandler'

class ArtistShow extends React.Component {

  state = {}

  render() {
    return (
      <>
      <AudioHandler />
      <Navbar />
      <h1>A Great singer of the jazz era</h1>
      </>
    )
  }
}

export default ArtistShow