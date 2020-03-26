import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Notifications from 'react-notify-toast'

import 'bulma'
import '@fortawesome/fontawesome-free/css/all.css'

import Authorize from '../lib/authorize'

import TitlePage from './common/TitlePage'
import HomePage from './common/Home'
import Navbar from './common/Navbar'
import ErrorPage from './common/ErrorPage'
import AudioHandler from './common/AudioHandler'

import UserAuth from './auth/UserAuth'
import MyProfile from './users/MyProfile'

import ArtistIndex from './artists/ArtistIndex'
import ArtistShow from './artists/ArtistShow'

import SongIndex from './songs/SongIndex'

class Index extends React.Component {

  state = {
    isSongPlaying: false,
    currentSong: null,
    isPreview: false,
    isLoggedIn: false
  }

  previewSong = songObj => {
    this.setState({ currentSong: songObj, isSongPlaying: true, isPreview: true })
  }

  playSong = songObj => {
    this.setState({ currentSong: songObj, isSongPlaying: true, isPreview: false })
  }

  endSong = () => {
    this.setState({ isSongPlaying: false, currentSong: null })
  }

  logout = () => {
    this.setState({ isLoggedIn: false, isSongPlaying: false, currentSong: null, isPreview: false })
  }

  login = () => {
    this.setState({ isLoggedIn: true })
  }

  render() {
    const { currentSong, isSongPlaying, isPreview, isLoggedIn } = this.state
    return (
      <>
      <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {Authorize.isAuthenticated() &&
          <> 
          <AudioHandler 
            isSongPlaying={isSongPlaying}
            currentSong={currentSong}
            endSong={this.endSong}
            isPreview={isPreview}
          />
          <Navbar logout={this.logout} />
          <Notifications />
          </>
        }
        <Switch>
          <Route exact path="/" component={TitlePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/register" render={(props) => <UserAuth {...props} login={this.login} />} />
          <Route path="/login" render={(props) => <UserAuth {...props} login={this.login} />} />
          <Route path="/my-profile">
            <MyProfile playSong={this.playSong} />
          </Route>
          <Route path="/songs">
            <SongIndex playSong={this.previewSong} />
          </Route>
          <Route path="/artists/:id" component={ArtistShow} />
          <Route path="/artists" component={ArtistIndex} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </div>
      </BrowserRouter>
      </>
    )
  }
} 

export default Index