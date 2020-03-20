import React from 'react'
import axios from 'axios'

import Navbar from './Navbar'

class HomePage extends React.Component {

  state = {}

  render() {
    return (
      <>
      <Navbar />
      <h1>The Home Page</h1>
      </>
    )
  }
}

export default HomePage