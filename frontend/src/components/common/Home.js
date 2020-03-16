import React from 'react'
import axios from 'axios'

import Navbar from './Navbar'
import AudioHandler from './AudioHandler'

class HomePage extends React.Component {

  state = {}

  render() {
    return (
      <>
      <AudioHandler />
      <Navbar />
      <h1>The Home Page</h1>
      </>
    )
  }
}

export default HomePage