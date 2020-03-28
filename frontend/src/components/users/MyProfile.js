import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'

import Authorize from '../../lib/authorize'

import FavouriteSongs from './FavouriteSongs'
import FavouriteArtists from './FavouriteArtists'
import MyPlaylists from './MyPlaylists'
import CreatePlaylist from './CreatePlaylist'

import ProfilePageBackground from '../../assets/profilePageBackground.jpg'

class MyProfile extends React.Component {

  state = {
    userData: null,
    sectionName: 'FavouriteSongs',
    formData: {
      name: '',
      description: '',
    },
    errors: {},
    currentPlaylist: {
      songs: []
    },
    selectedSongIds: [],
    songOptions: [],
    addingSongs: false
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({ userData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  refreshPage = async () => {
    const { sectionName, currentPlaylist } = this.state
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({ 
        userData: res.data,
        sectionName,
        formData: { ...this.state.formData, name: '', description: '' },
        errors: {},
        selectedSongIds: [],
        songOptions: [],
        addingSongs: false,
        currentPlaylist: res.data.playlists.filter(pl => pl.id === currentPlaylist.id)[0]
      })
      this.changeSongs()
    } catch (err) {
      console.log(err)
    }
  }

  changeSections = (e) => {
    this.setState({ sectionName: e.target.name })
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

  changeForm = ({ target: { name, value } }) => {
    this.setState({ 
      formData: { ...this.state.formData, [name]: value }, 
      errors: { ...this.state.errors, [name]: '' } 
    })
  }

  createPlaylist = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/playlists/', this.state.formData, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      notify.show('Playlist created', 'info', 2000, 'deepskyblue')
      this.refreshPage()
    } catch (err) {
      console.log('SOMETHING IS VERY WRONG!!!\n', err)
      this.setState({ errors: err.response.data })
    }
  }

  handleChange = async (e) => {
    const { userData } = this.state
    
    await this.setState({ 
      currentPlaylist: userData.playlists.filter(item => item.id === parseInt(e.target.value))[0],
      addingSongs: false,
      selectedSongIds: [] 
    })
    this.changeSongs()
  }

  handleMultiChange = (selected) => {
    const selectedSongIds = selected ? selected.map(item => item.value) : []
    this.setState({ selectedSongIds })
  }

  changeSongs = () => {
    const { currentPlaylist, userData } = this.state
    const songOptions = []

    const songIds = currentPlaylist.songs.map(song => song.id)
    userData.favourite_songs.map(song => {
      if (!songIds.includes(song.id)) {
        songOptions.push({ value: song.id, label: `${song.name} by ${song.artist.name}` })
      }
    })
    this.setState({ songOptions })
  }

  showSongOptions = () => {
    this.setState({ addingSongs: true })
  }

  hideSongOptions = () => {
    this.setState({ addingSongs: false })
  }

  addSongsToPlaylist = async (e) => {
    e.preventDefault()

    const { selectedSongIds, currentPlaylist } = this.state

    try {
      const res = await axios.post(`/api/playlists/${currentPlaylist.id}/add-song/`, {
        songIds: selectedSongIds
      }, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  removeSongFromPlaylist = async (songId) => {
    const { currentPlaylist } = this.state

    try {
      const res = await axios.post(`/api/playlists/${currentPlaylist.id}/remove-song/`, {
        songIds: [songId]
      }, {
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
    const { userData, sectionName } = this.state
    if (!userData) return null
    const sections = {
      'FavouriteSongs': <FavouriteSongs 
                          userData={this.state.userData} 
                          playSong={this.props.playSong} 
                          removeSong={this.unlikeSong} 
                        />,
      'FavouriteArtists': <FavouriteArtists 
                            userData={this.state.userData} 
                          />,
      'MyPlaylists': <MyPlaylists 
                      playSong={this.props.playSong} 
                      userData={this.state.userData}
                      currentPlaylist={this.state.currentPlaylist}
                      addingSongs={this.state.addingSongs}
                      songOptions={this.state.songOptions}
                      handleChange={this.handleChange}
                      handleMultiChange={this.handleMultiChange}
                      showSongOptions={this.showSongOptions}
                      hideSongOptions={this.hideSongOptions}
                      addSongs={this.addSongsToPlaylist}
                      removeSong={this.removeSongFromPlaylist}
                    />,
      'CreatePlaylist': <CreatePlaylist 
                          formData={this.state.formData}
                          changeForm={this.changeForm}
                          errors={this.state.errors}
                          createPlaylist={this.createPlaylist} 
                        />
    }
    return (
      <>
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll', backgroundImage: `url(${ProfilePageBackground})` }}>
        <div className="columns is-vcentered" style={{ height: '100%' }}>
          <div className="column is-one-quarter-desktop is-one-quarter-tablet is-full-mobile" style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '25px' }}>
            <aside className="menu">
              <div className="container has-text-centered" style={{ display: 'flex', justifyContent: 'center' }}>
              <figure className="image is-128x128">
                <img className="is-rounded" src={userData.profile_image} alt={`${userData.first_name} ${userData.last_name}`} />
              </figure>
              </div>
              <br />
              <h1 className="title is-1 has-text-centered has-text-white">{userData.first_name + ' ' + userData.last_name}</h1>
              <h2 className="subtitle is-4 has-text-centered has-text-white">{userData.alias}</h2>
              <hr />
              <p className="subtitle is-6 has-text-white has-text-weight-bold">Username: {userData.username}</p>
              <p className="subtitle is-6 has-text-white has-text-weight-bold">Email: {userData.email}</p>
              <div className="buttons">
                <button className="button is-info is-fullwidth" onClick={this.changeSections} name="FavouriteSongs">My Songs</button>
                <button className="button is-primary is-fullwidth" onClick={this.changeSections} name="FavouriteArtists">Favourite Artists</button>
                <button className="button is-success is-fullwidth" onClick={this.changeSections} name="MyPlaylists">My Playlists</button>
                <button className="button is-warning is-fullwidth" onClick={this.changeSections} name="CreatePlaylist">Create Playlist</button>
              </div>
            </aside>
          </div>
          <div className="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile" style={{ height: '100%' }}>
            {sections[sectionName]}
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default MyProfile