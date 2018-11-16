import React, { Component } from 'react'
import { Redirect } from 'react-router';

import RestClient from '../../common/restClient';

export default class RegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      repeatedPassword: '',
      error: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/login' />;
    }

    return (
      <form className={'form register__form'} onSubmit={this.handleSubmit}>
        <span className={'input-label'}>E-mail address</span>
        <input type={'text'} name={'email'} placeholder={'e-mail'} onChange={this.handleChange} value={this.state.email} />
        <span className={'input-label'}>Password</span>
        <input type={'password'} name={'password'} placeholder={'Password'} onChange={this.handleChange} value={this.state.password} />
        <span className={'input-label'}>Repeat password</span>
        <input type={'password'} name={'repeatedPassword'} placeholder={'Repeat password'} onChange={this.handleChange} value={this.state.repeatedPassword} />
        {this.state.error &&
          <div className='error-text'>
            invalid data
          </div>
        }
        <button className={'general__btn'}>Register</button>
      </form>
    )
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password, repeatedPassword } = this.state;

    RestClient.postRegister(email, password, repeatedPassword)
      .then(res => {
        this.setState({
          error: false,
          redirect: true
        })
      })
      .catch(err => this.setState({ error: true }));
  }
}
