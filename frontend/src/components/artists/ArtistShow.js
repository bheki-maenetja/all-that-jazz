import React from 'react'
import axios from 'axios'

import Authorize from '../../lib/authorize'

class ArtistShow extends React.Component {

  state = {
    userData: null,
    artistData: {}
  }

  async componentDidMount() {
    const artistId = this.props.match.params.id
    try {
      const res = await Promise.all([
        axios.get(`/api/artists/${artistId}/`),
        axios.get(`/api/users/my-profile/`, {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      this.setState({ artistData: res[0].data, userData: res[1].data })
    } catch (err) {
      console.log(err)
    }
  }

  refreshPage = async () => {
    const artistId = this.state.artistData.id
    try {
      const res = await Promise.all([
        axios.get(`/api/artists/${artistId}/`),
        axios.get(`/api/users/my-profile/`, {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      this.setState({ artistData: res[0].data, userData: res[1].data })
    } catch (err) {
      console.log(err)
    } 
  }

  getArtistStatus = (artistId) => {
    const { userData } = this.state
    const artistIds = userData.favourite_artists.map(artist => artist.id)
    return artistIds.includes(artistId)
  }

  likeArtist = async (artistId) => {
    try {
      const res = await axios.post('/api/users/like-artist/', {
        'artistIds': [artistId]
      },  {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.refreshPage()
    } catch (err) {
      console.log(err) 
    }
  }

  unlikeArtist = async (artistId) => {
    try {
      const res = await axios.post('/api/users/unlike-artist/', {
        'artistIds': [artistId]
      },  {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.refreshPage()
    } catch (err) {
      console.log(err) 
    }
  }

  render() {
    const { artistData, userData } = this.state
    if (!userData) return false
    return (
      <>
      <section className="section has-background-info" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              <figure className="image is-square">
                <img className="is-rounded" src={artistData.image_url} alt={artistData.name} style={{ border: '5px solid white' }} />
              </figure>
              <br />
              <h1 className="title is-1 has-text-centered has-text-white has-text-weight-bold">{artistData.name}</h1>
              <h2 className="subtitle is-4 has-text-centered has-text-white has-text-weight-bold">{artistData.nickname}</h2>
              <div className="container has-text-centered">
                {this.getArtistStatus(artistData.id) ?
                  <button className="button is-warning" onClick={() => this.unlikeArtist(artistData.id)}>Remove from Favourites</button>
                  :
                  <button className="button is-success" onClick={() => this.likeArtist(artistData.id)}>Add to Favourites</button>
                }
              </div>
              <br />
              <p className="subtitle is-5 has-text-centered has-text-white">{artistData.description}</p>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default ArtistShow