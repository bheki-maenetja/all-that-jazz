import React from 'react'
import { Link } from 'react-router-dom'

const FavouriteArtists = ({ userData }) => (
  <>
  <section className="section" style={{ height: '100%', overflowY: 'scroll' }}>
    <h1 className="title is-3 has-text-centered">My Favourite Artists</h1>
    <hr />
    <div className="container">
      <div className="columns is-mobile is-multiline">
        {userData.favourite_artists.map(art => (
          <>
          <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
            <Link to={`/artists/${art.id}`}>
              <figure className="image is-square">
                <img className="is-rounded" src={art.image_url} alt={art.name} />
              </figure>
              <figcaption className="title is-4 has-text-centered">{art.name}</figcaption>
            </Link>
          </div>
          </>
        ))}
      </div>
    </div>
  </section>
  </>
)

export default FavouriteArtists