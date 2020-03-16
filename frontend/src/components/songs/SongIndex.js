import React from 'react'
import axios from 'axios'

import Navbar from '../common/Navbar'
import AudioHandler from '../common/AudioHandler'

class SongIndex extends React.Component {

  state = {
    data: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/songs/')
      console.log(res)
      this.setState({ data: res.data })
    } catch(err) {
      console.log(err)
    }
  }

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