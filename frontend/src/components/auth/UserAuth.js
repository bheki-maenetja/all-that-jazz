import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Authorize from '../../lib/authorize'

class UserAuth extends React.Component {
  
  state = {
    uploadedImage: '',
    registerData: {
      first_name: '',
      last_name: '',
      alias: '',
      profile_image: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: {},
    error: '',
    loginData: {
      email: '',
      password: ''
    }
  }

  changeRegister = ({ target: { name, value } }) => {
    this.setState({ registerData: { ...this.state.registerData, [name]: value }, errors: { ...this.state.errors, [name]: '' } })
  }

  changeLogin = ({ target: { name, value } }) => {
    this.setState({ loginData: { ...this.state.loginData, [name]: value }, error: '' })
  }

  registerUser = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/users/register/', this.state.registerData)
      res.status === 201 ? console.log('Registered') : console.log(res.data)
      this.props.history.push('/login')
    } catch (err) {
      console.log('SOMETHING IS VERY WRONG!!!\n', err)
      this.setState({ errors: err.response.data })
    }
  }

  loginUser = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/users/login/', this.state.loginData)
      Authorize.setToken(res.data.token)
      this.props.history.push('/home')
      const { login } = this.props
      login()
    } catch (err) {
      console.log('SOMETHING IS VERY WRONG!!!\n', err)
      this.setState({ error: err.response.data.message })
    }
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', 'zvitw4hs')
    const res = await axios.post('https://api.cloudinary.com/v1_1/dyed10v2u/image/upload', data)
    this.setState({ uploadedImage: res.data.url, registerData: { ...this.state.registerData, profile_image: res.data.url } })
  }

  render() {
    const { uploadedImage } = this.state
    return (
      <>
      <section className="section" style={{ height: '100vh', display: 'flex', alignItems: 'center', overflowY: 'scroll', backgroundImage: `url(https://www.jazzireland.ie/images/blog/kind-of-blue-orchestrated.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ height: '100%' }}>
          <div className="columns is-vcentered" style={{ height: '100%' }}>
            {this.props.location.pathname === '/register' && 
              <>
              <form className="column is-half is-offset-one-quarter" style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '15px' }}>
                <h2 className="title is-2 has-text-centered has-text-white">Register</h2>
                <div className="field">
                  <label className="label has-text-white">First Name</label>
                  <div className="control">
                    <input 
                      type="text"
                      className={`input ${this.state.errors.first_name ? 'is-danger' : ''}`}
                      name="first_name"
                      placeholder="First Name" 
                      onChange={this.changeRegister}
                      value={this.state.registerData['first_name']}
                    />
                    {this.state.errors.first_name && <small className="has-text-danger">{this.state.errors.first_name[0]}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Last Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${this.state.errors.last_name ? 'is-danger' : ''}`}
                      name="last_name"
                      placeholder="Last Name" 
                      onChange={this.changeRegister}
                      value={this.state.registerData['last_name']}
                    />
                    {this.state.errors.last_name && <small className="has-text-danger">{this.state.errors.last_name[0]}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Alias</label>
                  <div className="control">
                    <input 
                      type="text"
                      className={`input ${this.state.errors.alias ? 'is-danger' : ''}`}
                      name="alias"
                      placeholder="Alias" 
                      onChange={this.changeRegister}
                      value={this.state.registerData['alias']}
                    />
                    {this.state.errors.alias && <small className="has-text-danger">{this.state.errors.alias[0]}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Profile Image</label>
                  <div className="control">
                  { uploadedImage ?
                    <>
                    <span className="tag is-danger is-medium">
                      Delete
                      <button className="delete is-medium" onClick={() => this.setState({ uploadedImage: '' })}></button>
                    </span>
                    <figure className="image">
                      <img src={uploadedImage} />
                    </figure>
                    </>
                    :
                    <>
                    <input 
                      type="file"
                      onChange={this.handleUpload}
                    />
                    {this.state.errors.profile_image && <small className="has-text-danger">{this.state.errors.profile_image[0]}</small>}
                    </>
                  }
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Username</label>
                  <div className="control">
                    <input 
                      type="text"
                      className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                      name="username"
                      placeholder="Username" 
                      onChange={this.changeRegister}
                      value={this.state.registerData['username']}
                    />
                    {this.state.errors.username && <small className="has-text-danger">{this.state.errors.username[0]}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Email</label>
                  <div className="control">
                    <input 
                      type="text"
                      className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                      name="email"
                      placeholder="Email Address" 
                      onChange={this.changeRegister}
                      value={this.state.registerData['email']}
                    />
                    {this.state.errors.email && <small className="has-text-danger">{this.state.errors.email[0]}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Password</label>
                  <div className="control">
                    <input 
                      type="text"
                      className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                      name="password"
                      placeholder="Password" 
                      onChange={this.changeRegister}
                      value={this.state.registerData['password']}
                    />
                    {this.state.errors.password && <small className="has-text-danger">{this.state.errors.password[0]}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Password Confirmation</label>
                  <div className="control">
                    <input 
                      type="text"
                      className={`input ${this.state.errors.password_confirmation ? 'is-danger' : ''}`}
                      name="password_confirmation"
                      placeholder="Confirm your password" 
                      onChange={this.changeRegister}
                      value={this.state.registerData['password_confirmation']}
                    />
                    {this.state.errors.password_confirmation && <small className="has-text-danger">{this.state.errors.password_confirmation[0]}</small>}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-info is-fullwidth" onClick={this.registerUser}>Submit</button>
                  </div>
                  <br />
                  <div className="container">
                    <p className="has-text-centered has-text-white has-text-weight-bold">Already have an account? <Link to="/login" className="has-text-warning">Login</Link></p>
                  </div>
                </div>
              </form>
              </>
            }
            {this.props.location.pathname === '/login' &&
              <>
              <form className="column is-half is-offset-one-quarter" style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '25px' }}>
                <h2 className="title is-2 has-text-centered has-text-white">Login</h2>
                <div className="field">
                  <label className="label has-text-white">Email</label>
                  <div className="control">
                    <input 
                      type="text"
                      name="email"
                      className={`input ${this.state.error ? 'is-danger' : ''}`}
                      placeholder="Email"
                      onChange={this.changeLogin} 
                    />
                    {this.state.error && <small className="has-text-danger">{this.state.error}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white">Password</label>
                  <div className="control">
                    <input 
                      type="password" 
                      name="password" 
                      className={`input ${this.state.error ? 'is-danger' : ''}`} 
                      placeholder="Password" 
                      onChange={this.changeLogin}
                    />
                    {this.state.error && <small className="has-text-danger">{this.state.error}</small>}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-primary is-fullwidth" onClick={this.loginUser}>Login</button>
                  </div>
                  <br />
                  <div className="container">
                    <p className="has-text-centered has-text-white has-text-weight-bold">Don't have an account? <Link to="/register" className="has-text-warning">Register</Link></p>
                  </div>
                </div>
              </form>
              </>
            }
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default UserAuth