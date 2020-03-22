import React from 'react'

class MyPlaylists extends React.Component { 

  state = {
    userData: null,
    currentPlaylist: {
      songs: []
    }
  }

  async componentDidMount() {
    this.setState({ userData: this.props.userData })
  }

  handleChange = (e) => {
    const { userData } = this.state
    this.setState({ 
      currentPlaylist: userData.playlists.filter(item => item.id === parseInt(e.target.value))[0] 
    })
  }

  render() {
    const { playSong } = this.props
    const { currentPlaylist, userData } = this.state
    if (!userData) return null
    console.log(currentPlaylist)
    return (
      <>
      <section className="section" style={{ height: '100%', overflowY: 'scroll' }}>
        <div className="level">
          <div className="level-item">
            <h1 className="title is-1">My Playlists</h1>
          </div>
          <div className="level-item">
            <form>
              <div className="field">
                <div className="control">
                  <select className="select" onChange={this.handleChange}>
                    <option value="" selected disabled>Select your Playlist</option>
                    {userData.playlists.map(playlist => {
                      return (
                        <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="container">
          {currentPlaylist.songs.map(song => (
            <>
            <div className="level card box" key={song.id}>
              <div className="level-left">
                <a onClick={() => playSong(song)}>
                  <i className="fas fa-play-circle fa-2x"></i>
                </a>
              </div>
              <div className="level-item has-text-left">
                <h4 className="subtitle is-6">{song.name}</h4>
              </div>
              <div className="level-item has-text-left">
                <h4 className="subtitle is-6">{song.artist.name}</h4>
              </div>
              <div className="level-item has-text-left">
                <h4 className="subtitle is-6">{song.release_year}</h4>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <button className="button is-info">Info</button>
                </div>
                <div className="level-item">
                  <button className="button is-danger">Remove</button>
                </div>
              </div>
            </div>
            </>
          ))}
        </div>
      </section>
      </>
    )
  }
}

export default MyPlaylists