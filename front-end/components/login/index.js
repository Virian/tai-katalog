import React from 'react';
import image from '../../public/images/background.jpg';
import LoginForm from '../form/loginForm';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  render() {
    return (
      <div className={'home-page'} style={{backgroundImage: `url(${image})`}}>
        <div className={'container'}>
          <div className={'container-header login-header'}>Photo catalog</div>
          <LoginForm/>
          <div className={'info'}>
            <div>Don't have an account yet?</div>
            <div>Sign up with just a single click!</div>
          </div>
          <div className={'register__section'}>
            <Link to={'/register'}><button className={'general__btn'}>Register</button></Link>
          </div>
        </div>
      </div>
    );
  }
}
