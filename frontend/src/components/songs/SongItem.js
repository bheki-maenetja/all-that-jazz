import React from 'react'
import { Link } from 'react-router-dom'

const SongItem = ({ song, playSong, getLikeStatus, likeSong, unlikeSong }) => (
  <>
  <div className="level card box" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}>
    <div className="level-left">
      <a onClick={() => playSong(song)}>
        <i className="fas fa-play-circle fa-2x has-text-warning"></i>
      </a>
    </div>
    <div className="level-item has-text-left">
      <h4 className="subtitle is-5 has-text-white has-text-weight-bold">{song.name}</h4>
    </div>
    <div className="level-item has-text-left">
      <Link to={`/artists/${song.artist.id}`}>
        <h4 className="subtitle is-5 has-text-white has-text-weight-bold">{song.artist.name}</h4>
      </Link>
    </div>
    <div className="level-item has-text-left">
      <h4 className="subtitle is-5 has-text-white has-text-weight-bold">{song.release_year}</h4>
    </div>
    <div className="level-right">
      <div className="level-item">
        {getLikeStatus(song) ?
          <button className="button is-danger" onClick={() => unlikeSong(song.id)}>Remove from Library</button>
          :
          <button className="button is-info" onClick={() => likeSong(song.id)}>Add to Library</button>
        }
      </div>
    </div>
  </div>
  </>
)

export default SongItem
