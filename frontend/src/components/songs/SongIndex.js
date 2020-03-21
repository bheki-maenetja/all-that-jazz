import React from 'react'
import axios from 'axios'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

class SongIndex extends React.Component {

  state = {
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
        axios.get('/api/songs/')
      ])
      this.setState({ 
        songCategories: res[0].data, 
        allSongs: res[1].data, 
        searchSongs: res[1].data, 
      })
    } catch(err) {
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
          <div className="hero is-info is-medium">
            <div className="hero-body">
              <h1 className="title is-1 has-text-white">Look at all those songs</h1>
              <h2 className="subtitle is-2 has-text-white">Subheading</h2>
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
        <section className="section">
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
            <div className="level">
              <div className="level-item">
                <h3 className="title is-3">Name</h3>
              </div>
              <div className="level-item">
                <h3 className="title is-3">Artist</h3>
              </div>
              <div className="level-item">
                <h3 className="title is-3">Released</h3>
              </div>
            </div>
            {searchSongs.map(song => (
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
                    <button className="button is-warning">Add</button>
                  </div>
                </div>
              </div>
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