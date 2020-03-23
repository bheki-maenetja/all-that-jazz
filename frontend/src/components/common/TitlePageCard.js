import React from 'react'

const TitlePageCard = ({ imageURL, name }) => (
  <>
  <div className="card">
    <div className="card-image">
      <figure className="image is-square">
        <img src={imageURL} alt={name} />
      </figure>
    </div>
    <div className="card-content">
      <h1 className="title is-2 has-text-centered has-text-black">{name}</h1>
    </div>
  </div>
  </>
)

export default TitlePageCard