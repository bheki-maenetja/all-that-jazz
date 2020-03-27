import React from 'react'
import ReactPlayer from 'react-player'

const AudioHandler = ({ isSongPlaying, currentSong, endSong, isPreview }) => (
  <>
  <div className="hero is-success">
    <div className="hero-body has-text-centered">
      {isSongPlaying ?
      <>  
      <div className="media">
        <figure className="media-left image is-128x128">
          <img className="is-rounded" src={currentSong.artist.image_url} alt={currentSong.artist.name} />
        </figure>
        <div className="media-content">
          <h1 className="title is-5 has-text-centered">{currentSong.name}</h1>
          <h2 className="subtitle is-6 has-text-centered">{currentSong.artist.name} - {currentSong.artist.nickname}</h2>
          <div className="container has-text-centered" style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactPlayer 
              url={isPreview ? currentSong.audio_preview_url : currentSong.audio_url}
              controls={true}
              height="50px"
              width="90%"
              onEnded={endSong}
              playing={true}
            />
          </div>
        </div>
      </div>
      </>
      :
      <>
      <div className="container">
        <div className="title is-1 has-text-centered">
          <i class="fas fa-music fa-2x animated pulse faster" style={{ color: 'yellow', textShadow: '5px 5px orange', animationIterationCount: 'infinite' }}></i>
        </div>
      </div>
      </>
      }
    </div>
  </div>
  </>
)
  


export default AudioHandler