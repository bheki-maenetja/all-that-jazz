import React from 'react'
import Select from 'react-select'

const MyPlaylists = ({ 
  currentPlaylist, 
  userData, 
  addingSongs, 
  songOptions, 
  playSong,
  handleChange,
  handleMultiChange,
  showSongOptions,
  hideSongOptions,
  addSongs, 
  removeSong
}) => (
  <>
  <section className="section" style={{ height: '100%', overflowY: 'scroll', backgroundColor: 'rgba(0,0,0,0.7)', padding: '50px', borderRadius: '25px' }}>
    <div className="level">
      <div className="level-item">
        <h1 className="title is-1 has-text-white has-text-weight-bold">My Playlists</h1>
      </div>
      <div className="level-item">
        <form>
          <div className="field">
            <div className="control">
              <select className="select" onChange={(e) => handleChange(e)}>
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
        <div className="level card box" key={song.id} style={{ backgroundColor: 'rgba(255,255,255, 0.9)' }}>
          <div className="level-left">
            <a onClick={() => playSong(song)}>
              <i className="fas fa-play-circle fa-2x has-text-success"></i>
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
              <button className="button is-danger" onClick={() => removeSong(song.id)}>Remove from Playlist</button>
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
                <label className="has-text-white">Add Songs</label>
                <div className="control is-expanded">
                  <Select options={songOptions} isMulti onChange={(selected) => handleMultiChange(selected)} />
                </div>
              </div>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <button className="button is-success is-fullwidth" onClick={(e) => addSongs(e)}>Add Songs</button>
                </div>
                <div className="control is-expanded">
                  <button 
                    className="button is-danger is-fullwidth" onClick={() => hideSongOptions()}>Close</button>
                </div>
              </div>
            </form>
            </>
            :
            <a href="#" className="link subtitle is-4 has-text-centered has-text-primary has-text-weight-bold" onClick={() => showSongOptions()}>Add Songs</a>
          }
        </div>
        </>
      }
    </div>
  </section>
  </>
)

export default MyPlaylists