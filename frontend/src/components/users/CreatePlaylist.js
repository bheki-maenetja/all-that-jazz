import React from 'react'
import axios from 'axios'

const CreatePlaylist = ({ formData, changeForm, errors, createPlaylist }) => (
  <>
  <section className="section" style={{ height: '100%', overflowY: 'scroll' }}>
    <h1 className="title is-3 has-text-centered">Create a Playlist</h1>
    <hr />
    <div className="container">
      <form>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              type="text"
              className="input"
              onChange={changeForm}
              name="name"
              value={formData['name']}
            />
            {errors.name && 
              <small className="has-text-danger">{errors.name[0]}</small>
            }
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input 
              type="text"
              className="input"
              onChange={changeForm}
              name="description"
              value={formData['description']}
            />
            {errors.description && 
              <small className="has-text-danger">{errors.description[0]}</small>
            }
          </div>
        </div>
        <div className="field">
          <div className="control is-expanded">
            <button className="button is-info is-fullwidth" onClick={createPlaylist}>Create Playlist</button>
          </div>
        </div>
      </form>
    </div>
  </section>
  </>
)

export default CreatePlaylist