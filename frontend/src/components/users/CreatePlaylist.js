import React from 'react'

const CreatePlaylist = ({ formData, changeForm, errors, createPlaylist }) => (
  <>
  <section className="section" style={{ height: '100%', overflowY: 'scroll', backgroundColor: 'rgba(0,0,0,0.7)', padding: '50px', borderRadius: '25px' }}>
    <h1 className="title is-3 has-text-centered has-text-white has-text-weight-bold">Create a Playlist</h1>
    <hr />
    <div className="container">
      <form>
        <div className="field">
          <label className="label has-text-white">Name</label>
          <div className="control">
            <input 
              type="text"
              className="input"
              onChange={changeForm}
              name="name"
              placeholder="Enter a name for your playlist"
              value={formData['name']}
            />
            {errors.name && 
              <small className="has-text-danger">{errors.name[0]}</small>
            }
          </div>
        </div>
        <div className="field">
          <label className="label has-text-white">Description</label>
          <div className="control">
            <input 
              type="text"
              className="input"
              onChange={changeForm}
              name="description"
              placeholder="How would you describe this playlist?"
              value={formData['description']}
            />
            {errors.description && 
              <small className="has-text-danger">{errors.description[0]}</small>
            }
          </div>
        </div>
        <div className="field">
          <div className="control is-expanded">
            <button className="button is-link is-fullwidth" onClick={createPlaylist}>Create Playlist</button>
          </div>
        </div>
      </form>
    </div>
  </section>
  </>
)

export default CreatePlaylist