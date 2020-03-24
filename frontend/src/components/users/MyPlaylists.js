import React from 'react'
import Select from 'react-select'

class MyPlaylists extends React.Component { 

  state = {
    userData: null,
    currentPlaylist: {
      songs: []
    },
    selectedSongIds: [],
    songOptions: [],
    addingSongs: false
  }

  async componentDidMount() {
    this.setState({ userData: this.props.userData })
  }

  handleChange = async (e) => {
    const { userData } = this.state
    
    await this.setState({ 
      currentPlaylist: userData.playlists.filter(item => item.id === parseInt(e.target.value))[0] 
    })
    this.changeSongs()
  }

  handleMultiChange = (selected) => {
    const selectedSongIds = selected ? selected.map(item => item.value) : []
    this.setState({ selectedSongIds })
  }

  changeSongs = () => {
    const { currentPlaylist, userData } = this.state
    const songOptions = []

    const songIds = currentPlaylist.songs.map(song => song.id)
    userData.favourite_songs.map(song => {
      if (!songIds.includes(song.id)) {
        songOptions.push({ value: song.id, label: song.name })
      }
    })
    this.setState({ songOptions })
  }

  render() {
    const { playSong } = this.props
    const { currentPlaylist, userData, addingSongs, songOptions, selectedSongIds } = this.state
    if (!userData) return null
    console.log(selectedSongIds)
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
                  <button className="button is-danger">Remove from Playlist</button>
                </div>
              </div>
            </div>
            </>
          ))}
          {currentPlaylist.id &&
            <>
            <hr />
            <div className="container has-text-centered">
              {addingSongs ?
                <>
                <form>
                  <div className="field">
                    <label>Add Songs</label>
                    <div className="control is-expanded">
                      <Select options={songOptions} isMulti onChange={this.handleMultiChange} />
                    </div>
                  </div>
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <button className="button is-warning is-fullwidth">Add Songs</button>
                    </div>
                    <div className="control is-expanded">
                      <button 
                        className="button is-danger is-fullwidth" onClick={() => this.setState({ addingSongs: false })}>Close</button>
                    </div>
                  </div>
                </form>
                </>
                :
                <a href="#" className="link subtitle is-5 has-text-centered has-text-link" onClick={() => this.setState({ addingSongs: true })}>Add Songs</a>
              }
            </div>
            </>
          }
        </div>
      </section>
      </>
    )
  }
}

export default MyPlaylists