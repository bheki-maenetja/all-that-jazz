import React from 'react'
import axios from 'axios'

import Navbar from '../common/Navbar'

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
    const { thisFunc } = this.props
    return (
      <>
      <Navbar />
      <h1>The Song Index</h1>
      <button className="button is-info" onClick={thisFunc}>CLICK ME!!!</button>
      </>
    )
  }
}

export default SongIndex