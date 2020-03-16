import React from 'react'
import ReactPlayer from 'react-player'

class AudioHandler extends React.Component {

  state = {
    isSongPlaying: false
  }

  render() {
    const { isSongPlaying } = this.state
    return (
      <>
      <div className="hero is-primary">
        <div className="hero-body has-text-centered">
          {isSongPlaying ?
          <>  
          <div className="media">
            <figure className="media-left">
              <p className="image is-128x128">
                <img src="https://50nx67a44a-flywheel.netdna-ssl.com/wp-content/uploads/2015/02/Frank-Sinatra.jpg" alt="artist name" />
              </p>
            </figure>
            <div className="media-content">
              <h1 className="title is-5 has-text-centered">Song Name</h1>
              <h2 className="subtitle is-6 has-text-centered">Artist - Artist Nickname</h2>
              <ReactPlayer 
                url='https://res.cloudinary.com/dyed10v2u/video/upload/v1583760310/upload_songs/13_My_Kind_of_Town_Remastered_she5fi.mp3'
                controls={true}
                height="50px"
                width="100%"
                onEnded={() => this.setState({ isSongPlaying: false })}
              />
            </div>
          </div>
          </>
          :
          <>
          <div className="container">
            <div className="title is-1 has-text-centered">Explore the World of Jazz</div>
          </div>
          </>
          }
        </div>
      </div>
      </>
    )
  }
}

export default AudioHandler