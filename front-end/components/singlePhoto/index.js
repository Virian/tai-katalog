import React from 'react';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import { Link } from 'react-router-dom';

export default class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='gallery__single-photo-container'>
        <div className='gallery__single-photo' style={{ backgroundImage: `url(${this.props.image})` }}>
        </div>
        <Link to={`/edit/${this.props.photoId}`}><img src={editIcon} className='gallery__icon'/></Link>
        <img src={deleteIcon} className='gallery__icon'/>
      </div>
    );
  }
}
