import React from 'react'

import Navbar from '../common/Navbar'
import AudioHandler from '../common/AudioHandler'

class SongIndex extends React.Component {

  state = {}

  render() {
    return (
      <>
      <AudioHandler />
      <Navbar />
      <h1>The Song Index</h1>
      </>
    )
  }
}

export default SongIndex