import React from 'react';
import Dropzone from 'react-dropzone';
import Cookies from 'universal-cookie';

import RestClient from '../../common/restClient';

export default class PhotoDropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploaded: false,
    }

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const cookies = new Cookies();

    RestClient.postUploadPhoto(cookies.get('token'), acceptedFiles[0])
      .then(res => {
         this.props.uploadCompleted();
      })
      .catch(err => console.error(err));
  }

  render() {
    const accept = 'image/jpeg,image/jpg,image/png';
    const maxSize = 10000000; //10MB
    const maxFiles = 1;

    return (
      <Dropzone
        maxSize={maxSize}
        maxfiles={maxFiles}
        onDrop={this.onDrop}
        accept={accept}
        className={'upload__dropzone upload__details'}
      >
        <div className='font-profile font--light'>
          Drag and drop an image or click to upload
        </div>
      </Dropzone>
    )
  }
}
