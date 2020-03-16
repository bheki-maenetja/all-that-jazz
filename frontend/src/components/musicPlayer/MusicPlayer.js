import React from 'react'

import Navbar from '../common/Navbar'
import AudioHandler from '../common/AudioHandler'

class MusicPlayer extends React.Component {

  state = {}

  render() {
    return (
      <>
      <AudioHandler />
      <Navbar />
      <h1>The Music Player</h1>
      </>
    )
  }
}

export default MusicPlayer