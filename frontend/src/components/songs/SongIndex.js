import React from 'react'
import axios from 'axios'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

import Authorize from '../../lib/authorize'

import SongItem from './SongItem'

import SongIndexBackground from '../../assets/songIndexBackground.jpg'

class SongIndex extends React.Component {

  state = {
    userData: {},
    songCategories: [],
    allSongs: [],
    searchString: '',
    searchSongs: [],
    pageIndex: 0
  }

  async componentDidMount() {
    try {
      const res = await Promise.all([
        axios.get('/api/songs/categories/'),
        axios.get('/api/songs/'),
        axios.get('/api/users/my-profile/', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      this.setState({ 
        songCategories: res[0].data, 
        allSongs: res[1].data, 
        searchSongs: res[1].data,
        userData: res[2].data 
      })
    } catch(err) {
      console.log(err)
    }
  }

  refreshPage = async () => {
    const { pageIndex } = this.state
    try {
      const res = await Promise.all([
        axios.get('/api/songs/'),
        axios.get('/api/users/my-profile/', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      await this.setState({ 
        userData: res[1].data, 
        allSongs: res[0].data
      })
      this.changeSongs(pageIndex)
    } catch (err) {
      console.log(err)
    }
  }

  changeSongs = (pageIndex) => {
    const { songCategories, allSongs } = this.state
    if (pageIndex === 0) {
      this.setState({ searchSongs: allSongs })
      return
    }
    this.setState({ searchSongs: songCategories[pageIndex - 1].songs, pageIndex, searchString: '' })
  }

  basicSearchFunction = (e) => {
    const searchString = e.target.value.toLowerCase()
    const searchData = this.state.allSongs.filter(song => (
      song.name.toLowerCase().includes(searchString) ||
      searchString.includes(song.name.toLowerCase()) ||
      song.artist.name.toLowerCase().includes(searchString) ||
      searchString.includes(song.artist.name.toLowerCase())
    ))
    this.setState({ searchSongs: searchData, searchString: e.target.value })
  }

  getSongStatus = (song) => {
    const { userData } = this.state
    const songIds = userData.favourite_songs.map(song => song.id)
    return songIds.includes(song.id)
  }

  likeSong = async (songId) => {
    try {
      const res = await axios.post('/api/users/like-song/', {
        'songIds': [songId]
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

  unlikeSong = async (songId) => {
    try {
      const res = await axios.post('/api/users/unlike-song/', {
        'songIds': [songId]
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
    const { songCategories, searchSongs, pageIndex, searchString } = this.state
    const { playSong } = this.props
    return (
      <>
      <div style={{flexGrow: '1', overflowY: 'scroll'}}>
        <Carousel
          showThumbs={false} 
          showStatus={false} 
          infiniteLoop={true} 
          autoPlay={false}
          swipeable={false}
          selectedItem={pageIndex}
          dynamicHeight={true}
          onChange={this.changeSongs}
        >
          <div className="hero is-primary is-medium" style={{ height: '100%' }}>
            <div className="hero-body">
              <h1 className="title is-1 has-text-white">Songs</h1>
              <h2 className="subtitle is-3 has-text-white">Explore songs from the greatest jazz artists of the last century</h2>
            </div>
          </div>
          {songCategories.map(cat => (
            <>
            <div className="hero is-medium" style={{backgroundImage: `url(${cat.image_url})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
              <div className="hero-body">
                <h1 className="title is-1 has-text-white">{cat.name}</h1>
                <h2 className="subtitle is-2 has-text-white">{cat.description}</h2>
              </div>
            </div>
            </>
          ))}
        </Carousel>
        <section className="section" style={{ backgroundImage: `url(${SongIndexBackground})` }}>
          <div className="container">
            <form>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input 
                    type="text" 
                    className="input" 
                    onChange={this.basicSearchFunction} 
                    value={searchString}
                  />
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary" onClick={(e) => e.preventDefault()}>Search</button>
                </div>
              </div>
            </form>
            <br />
            <div className="level" style={{ backgroundColor: 'rgba(0,0,0, 0.7)', borderRadius: '5px' }}>
              <div className="level-item">
                <h3 className="title is-3 has-text-white" style={{ textShadow: '2px 2px black' }}>Name</h3>
              </div>
              <div className="level-item">
                <h3 className="title is-3 has-text-white" style={{ textShadow: '2px 2px black' }}>Artist</h3>
              </div>
              <div className="level-item">
                <h3 className="title is-3 has-text-white" style={{ textShadow: '2px 2px black' }}>Released</h3>
              </div>
              <div className="level-item"></div>
            </div>
            {searchSongs.map(song => (
              <>
                <SongItem 
                  key={song.id} 
                  song={song} 
                  playSong={playSong}
                  getLikeStatus={this.getSongStatus}
                  likeSong={this.likeSong}
                  unlikeSong={this.unlikeSong}
                />
              </>
            ))}
          </div>
        </section>
      </div>
      </>
    )
  }
}

export default SongIndex