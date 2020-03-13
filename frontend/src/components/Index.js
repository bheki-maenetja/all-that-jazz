import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'

import TitlePage from './common/TitlePage'
import HomePage from './common/Home'
import ErrorPage from './common/ErrorPage'
import Navbar from './common/Navbar'

import UserAuth from './auth/UserAuth'
import MyProfile from './users/MyProfile'

import ArtistIndex from './artists/ArtistIndex'
import ArtistShow from './artists/ArtistShow'

import MusicPlayer from './musicPlayer/MusicPlayer'

import SongIndex from './songs/SongIndex'

const Index = () => (
  <BrowserRouter>
  <>
  <Navbar />
  <Switch>
    <Route exact path="/" component={TitlePage} />
    <Route path="/home" component={HomePage} />
    <Route path="/register" component={UserAuth} />
    <Route path="/login" component={UserAuth} />
    <Route path="/my-profile" component={MyProfile} />
    <Route path="/songs" component={SongIndex} />
    <Route path="/artists/:id" component={ArtistShow} />
    <Route path="/artists" component={ArtistIndex} />
    <Route path="/music-player" component={MusicPlayer} />
    <Route path="/*" component={ErrorPage} />
  </Switch>
  </>
  </BrowserRouter>
)

export default Index