import React from 'react';

import RestClient from "../../common/restClient";
import Cookies from "universal-cookie";
import backIcon from '../../assets/back.svg';
import { Link } from 'react-router-dom';
import EditExifForm from '../form/editExifForm';

export default class EditPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploaded: false,
    };
  }


  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const cookies = new Cookies();

    RestClient.getPhoto(cookies.get('token'), this.props.match.params.photoId)
      .then((res) => {
        this.setState({
          imageUrl: res.data.url,
          exif: res.data.exif
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.exif) {
      return (
        <div className='gallery__container gallery__edit-exif'></div>
      )
    }

    return (
      <div className='gallery__container gallery__edit-exif'>
        <div className='gallery-sidebar'>
          <div className='filters__container gallery__edit-sidebar'>
            <Link to={'/gallery'}><img src={`http://localhost:8080/${backIcon}`} className='gallery__icon gallery__back-icon'/></Link>
          </div>
          <img src={this.state.imageUrl} className='gallery__edited-image'/>
        </div>
        <div className='gallery'>
          <div className='gallery__photo-container'>
            <div className='gallery__edit-title'>Edit EXIF data</div>
            <div className={'gallery__edit-container'}>
              <EditExifForm
                exif={this.state.exif}
                photoId={this.props.match.params.photoId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
