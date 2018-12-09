import React from 'react';

import closeIcon from '../../assets/close.svg';
import PhotoDropzone from '../photoDropzone';

export default class UploadPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploaded: false,
    }
  }

  uploadCompleted() {
    this.setState({ isUploaded: true});
    this.props.uploadCompleted();
  }

  render() {
    const { closePopup } = this.props;

    return (
      <div className='upload__overlay'>
        <div className='upload__popup'>
          <img src={closeIcon} className='gallery__icon upload__icon'
            onClick={closePopup} />
            {this.state.isUploaded &&
              <div className='upload__info'>File uploaded successfully!</div>
            }
          <PhotoDropzone
          uploadCompleted={() => this.uploadCompleted()}/>
        </div>
      </div>
    );
  }
}
