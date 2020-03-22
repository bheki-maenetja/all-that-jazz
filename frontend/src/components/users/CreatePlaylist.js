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
              <label className="label">Name</label>
              <div className="control">
                <input 
                  type="text"
                  className="input"
                  onChange={() => console.log('Change is coming...')}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input 
                  type="text"
                  className="input"
                  onChange={() => console.log('Change is coming...')}
                />
              </div>
            </div>
            <div className="field">
              <div className="control is-expanded">
                <button className="button is-info is-fullwidth">Create Playlist</button>
              </div>
            </div>
          </form>
        </div>
      </section>
      </>
    )
  }
}

export default CreatePlaylist