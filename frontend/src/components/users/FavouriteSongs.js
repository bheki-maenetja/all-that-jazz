import React from 'react'

const FavouriteSongs = ({ userData, playSong }) => (
  <>
  <section className="section" style={{ height: '100%', overflowY: 'scroll' }}>
    <h1 className="title is-3 has-text-centered">My Songs</h1>
    <hr />
    <div className="container">
      {userData.favourite_songs.map(song => (
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

export default FavouriteSongs