import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ArtistIndex extends React.Component {

  state = {
    artists: [],
    searchArtists: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/artists/')
      this.setState({ artists: res.data, searchArtists: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  basicSearchFunction = (e) => {
    const { artists } = this.state
    const searchString = e.target.value.toLowerCase().trim()
    const searchArtists = artists.filter(art => (
      art.name.toLowerCase().includes(searchString) || searchString.includes(art.name.toLowerCase())
    ))
    this.setState({ searchArtists })
  }

  render() {
    const { searchArtists } = this.state
    return (
      <>
      <div style={{flexGrow: '1', overflowY: 'scroll'}}>
        <div className="hero is-success is-medium">
          <div className="hero-body">
            <h1 className="title is-1 has-text-centered">The Artist Index</h1>
            <h2 className="subtitle is-2 has-text-centered">Subheading</h2>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <form>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input 
                    type="text" 
                    className="input" 
                    onChange={this.basicSearchFunction} 
                  />
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary" onClick={(e) => e.preventDefault()}>Search</button>
                </div>
              </div>
            </form>
            <br />
            <div className="columns is-mobile is-multiline">
              {searchArtists.map(art => (
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
      </div>
      </>
    )
  }
}

export default ArtistIndex