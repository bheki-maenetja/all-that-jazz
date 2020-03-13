import React from 'react'
import axios from 'axios'

class HomePage extends React.Component {

  state = { data: [] }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/artists/')
      console.log(res)
      this.setState({ data: res.data })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state)
    return (
      <>
      <h1>The Home Page</h1>
      </>
    )
  }
}

export default HomePage