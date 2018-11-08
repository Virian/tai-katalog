import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      redirect: false,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/gallery' />;
    }

    return (
      <form className={'form'} onSubmit={this.handleSubmit}>
        <input type={'text'} name={'email'} placeholder={'Your e-mail'} onChange={this.handleChange} value={this.state.email} />
        <input type={'password'} name={'password'} placeholder={'Password'} onChange={this.handleChange} value={this.state.password} />
        {this.state.error &&
          <div className='error-text'>
            invalid data
          </div>
        }
        <button className={'general__btn'}>Log in</button>
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

    const { email, password } = this.state;

    //to do: send email and password to verification
  }

  setCookies() {
    const cookies = new Cookies();
    cookies.set('token', this.state.token, { path: '/' }, { maxAge: 86400 });
    cookies.set('email', this.state.email);
  }
}
