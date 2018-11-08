import React from 'react';
import image from '../../public/images/background.jpg';
import RegisterForm from '../form/registerForm';

export default class Login extends React.Component {
  render() {
    return (
      <div className={'home-page'} style={{backgroundImage: `url(${image})`}}>
        <div className={'container'}>
          <div className={'container-header register-header'}>
            <div>Sign up today to</div>
            <div>Photo catalog</div>
          </div>
          <RegisterForm/>
        </div>
      </div>
    );
  }
}
