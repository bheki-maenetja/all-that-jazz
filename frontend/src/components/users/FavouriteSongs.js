import React from 'react'
import { Link } from 'react-router-dom'

const FavouriteSongs = ({ userData, playSong, removeSong }) => (
  <>
  <section className="section" style={{ height: '100%', overflowY: 'scroll', backgroundColor: 'rgba(0,0,0,0.7)', padding: '50px', borderRadius: '25px' }}>
    <h1 className="title is-3 has-text-centered has-text-white has-text-weight-bold">My Songs</h1>
    <hr />
    <div className="container">
      {userData.favourite_songs.map(song => (
        <>
        <div className="level card box" style={{ backgroundColor: 'rgba(255,255,255, 0.9)' }}>
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
              <button className="button is-danger" onClick={() => removeSong(song.id)}>Remove</button>
            </div>
          </div>
        </div>
        </>
      ))}
    </div>
  </section>
  </>
)

export default FavouriteSongs