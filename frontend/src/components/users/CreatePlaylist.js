import React from 'react'
// import axios from 'axios'

class CreatePlaylist extends React.Component {
  
  state = {}

  render() {
    console.log(this.props)
    return (
      <>
      <section className="section" style={{ height: '100%', overflowY: 'scroll' }}>
        <h1 className="title is-3 has-text-centered">Create a Playlist</h1>
        <hr />
        <div className="container">
          <form>
            <div className="field">

            </div>
          </form>
        </div>
      </section>
      </>
    )
  }
}

export default CreatePlaylist