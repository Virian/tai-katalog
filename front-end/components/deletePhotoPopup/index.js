import React from 'react';
import Cookies from 'universal-cookie';

import RestClient from '../../common/restClient';
import closeIcon from '../../assets/close.svg';

export default class DeletePhotoPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  deletePhoto() {
    const cookies = new Cookies();
    RestClient.postRemovePhoto(cookies.get('token'), this.props.photoId)
      .then(() => {
        this.props.deleteCompleted();
        this.props.closePopup();
      })
  }

  render() {
    const { closePopup } = this.props;

    return (
      <div className='delete__overlay'>
        <div className='delete__popup'>
          <img src={closeIcon} className='gallery__icon upload__icon'
            onClick={closePopup} />
          <p>Do you really want to delete this photo?</p>
          <div className='delete__button-container'>
            <span className='delete__button delete__button--delete' onClick={() => this.deletePhoto()}>delete</span>
            <span className='delete__button delete__button--cancel' onClick={closePopup}>cancel</span>
          </div>
        </div>
      </div>
    );
  }
}
