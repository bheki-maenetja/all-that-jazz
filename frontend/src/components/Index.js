import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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

import MusicPlayer from './musicPlayer/MusicPlayer'

import SongIndex from './songs/SongIndex'

class Index extends React.Component {

  state = {
    isSongPlaying: false,
    currentSong: null,
    isPreview: false
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

  render() {
    const { currentSong, isSongPlaying, isPreview } = this.state
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
          <Navbar />
          </>
        }
        <Switch>
          <Route exact path="/" component={TitlePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/register" component={UserAuth} />
          <Route path="/login" component={UserAuth} />
          <Route path="/my-profile" component={MyProfile} />
          <Route path="/songs">
            <SongIndex playSong={this.previewSong} />
          </Route>
          <Route path="/artists/:id" component={ArtistShow} />
          <Route path="/artists" component={ArtistIndex} />
          <Route path="/music-player" component={MusicPlayer} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </div>
      </BrowserRouter>
      </>
    )
  }
} 

export default Index