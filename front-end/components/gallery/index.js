import React from 'react';
import Cookies from 'universal-cookie';

import RestClient from '../../common/restClient';
import SinglePhoto from '../singlePhoto';
import SingleFilter from '../singleFilter';
import UploadPopup from '../uploadPopup';
import DeletePhotoPopup from '../deletePhotoPopup';
import Options from '../sortingDropdown/select.json';
import Dropdown from '../sortingDropdown';

import Filters from './filters.json';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserDataReady: false,
      isPhotosLoaded: false,
      uploadPopupActive: false,
      filterJSON: {},
      deletePopupActive: false,
      photoIdToDelete: null,
      sortingQuery: {},
    }

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const cookies = new Cookies();

    this.setState({
      loggedUsername: cookies.get('email'),
      isUserDataReady: true
    })

    RestClient.getPhotos(cookies.get('token'))
      .then(response => {
        this.setState({
          isPhotosLoaded: true,
          photos: response.data,
          photosNumber: response.data.length,
        })
      })
      .catch(err => console.error(err));
  }

  uploadCompleted() {
    this.fetch();
  }

  openUploadPopup() {
    this.setState({ uploadPopupActive: true });
  }

  closeUploadPopup() {
    this.setState({ uploadPopupActive: false });
  }

  handleFilterChange(field, value) {
    const { filterJSON } = this.state;
    value === '' ? delete filterJSON[field] : filterJSON[field] = value;
  }

  handleFilterPhotos() {
    const cookies = new Cookies();

    RestClient.postGetSpecificPhotos(cookies.get('token'), this.state.filterJSON, this.state.sortingQuery)
      .then(response => {
        this.setState({
          photos: response.data,
        })
      })
      .catch(err => console.error(err));
  }

  deleteCompleted() {
    this.fetch();
  }

  openDeletePopup(photoId) {
    this.setState({
      deletePopupActive: true,
      photoIdToDelete: photoId,
    });
  }

  closeDeletePopup() {
    this.setState({
      deletePopupActive: false,
      photoIdToDelete: null,
    });
  }

  handleSelectChange(query) {
    this.setState({
      sortingQuery: query
    })
    const cookies = new Cookies();
    RestClient.postGetSpecificPhotos(cookies.get('token'), this.state.filterJSON, this.state.sortingQuery)
      .then(response => {
        this.setState({
          photos: response.data,
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    const { isUserDataReady, loggedUsername, isPhotosLoaded, photosNumber, photos, uploadPopupActive, deletePopupActive, photoIdToDelete, filterJSON } = this.state;
    return (
      <div className='gallery__container'>
        <div className='gallery-sidebar'>
          {
            isUserDataReady &&
            <div className='gallery-sidebar__user-info'>
              {loggedUsername},<br /> you have {isPhotosLoaded && photosNumber}
              {photosNumber !== 1
                ? ' photos'
                : ' photo'}
            </div>
          }

          <div className='sort'>
            <div className='filters'>
              Sort by:
            </div>
            <div onChange={this.handleSelectChange}>
              {
                Options.option.map((option, key) => {
                  return <Dropdown
                    key={key}
                    option={option}
                    handleSelectChange={this.handleSelectChange}
                  />
                })
              }
            </div>
          </div>

          <div className='filters__container'>
            <div className='filters'>
              Filters:
            </div>

            {
              Filters.filters.map((filter, key) => {
                return <SingleFilter
                  key={key}
                  filter={filter}
                  handleFilterChange={this.handleFilterChange}
                />
              })
            }

            <div className='filter__btn'
              onClick={() => this.handleFilterPhotos()}>
              Filter
            </div>
          </div>
        </div>
        <div className='gallery'>
          <div className='gallery__title'>
            Your gallery
          </div>
          <div className='gallery__btn' onClick={() => this.openUploadPopup()}>
            Upload image
          </div>

          {uploadPopupActive &&
            <UploadPopup
              closePopup={() => this.closeUploadPopup()}
              uploadCompleted={() => this.uploadCompleted()}
            />
          }
          {deletePopupActive &&
            <DeletePhotoPopup
              closePopup={() => this.closeDeletePopup()}
              deleteCompleted={() => this.deleteCompleted()}
              photoId={photoIdToDelete}
            />
          }
          <div className='gallery__photo-container'>
            {
              (isPhotosLoaded && (photos.length > 0)) ?
                photos.map((photo, key) => {
                  return <SinglePhoto
                    image={photo.url}
                    key={key}
                    openDeletePopup={() => this.openDeletePopup(photo._id)}
                    photoId={photo._id}
                  />
                })
                : (isPhotosLoaded && (Object.keys(filterJSON).length > 0)
                  ? <div className='gallery__subtitle'>
                    No images found with such exif values!
                  </div>
                  :
                  <div className='gallery__subtitle'>
                    You don't have any images yet!
                  </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}
