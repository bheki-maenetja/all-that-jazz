import React from 'react'
import axios from 'axios'

class ArtistShow extends React.Component {

  state = {
    artistData: {}
  }

  async componentDidMount() {
    const artistId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/artists/${artistId}/`)
      this.setState({ artistData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { artistData } = this.state
    return (
      <>
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              <figure className="image is-square">
                <img className="is-rounded" src={artistData.image_url} alt={artistData.name} />
              </figure>
              <br />
              <h1 className="title is-1 has-text-centered">{artistData.name}</h1>
              <h2 className="subtitle is-4 has-text-centered">{artistData.nickname}</h2>
              <p className="subtitle is-5 has-text-centered">{artistData.description}</p>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default ArtistShow