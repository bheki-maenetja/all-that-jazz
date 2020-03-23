import React from 'react'
import { Link } from 'react-router-dom'

const SongItem = ({ song, playSong, getLikeStatus, likeSong, unlikeSong }) => (
  <>
  <div className="level card box">
    <div className="level-left">
      <a onClick={() => playSong(song)}>
        <i className="fas fa-play-circle fa-2x"></i>
      </a>
    </div>
    <div className="level-item has-text-left">
      <h4 className="subtitle is-6">{song.name}</h4>
    </div>
    <div className="level-item has-text-left">
      <Link to={`/artists/${song.artist.id}`}>
        <h4 className="subtitle is-6">{song.artist.name}</h4>
      </Link>
    </div>
    <div className="level-item has-text-left">
      <h4 className="subtitle is-6">{song.release_year}</h4>
    </div>
    <div className="level-right">
      <div className="level-item">
        {getLikeStatus(song) ?
          <button className="button is-danger" onClick={() => unlikeSong(song.id)}>Unlike</button>
          :
          <button className="button is-info" onClick={() => likeSong(song.id)}>Like</button>
        }
      </div>
    </div>
  </div>
  </>
)

export default SongItem
