import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import RestClient from '../../common/restClient';

export default class EditExifForm extends Component {
  constructor(props) {
    super(props);

    let exifData = this.props.exif;

    this.state = {
      ApertureValue: exifData.ApertureValue,
      ColorSpace: exifData.ColorSpace,
      CompressedBitsPerPixel: exifData.CompressedBitsPerPixel,
      CreateDate: exifData.CreateDate,
      DateTimeOriginal: exifData.DateTimeOriginal,
      ExifImageHeight: exifData.ExifImageHeight,
      ExifImageWidth: exifData.ExifImageWidth,
      ExposureCompensation: exifData.ExposureCompensation,
      FNumber: exifData.FNumber,
      Flash: exifData.Flash,
      FocalLength: exifData.FocalLength,
      FocalPlaneResolutionUnit: exifData.FocalPlaneResolutionUnit,
      FocalPlaneXResolution: exifData.FocalPlaneXResolution,
      FocalPlaneYResolution: exifData.FocalPlaneYResolution,
      InteropOffset: exifData.InteropOffset,
      ISO: exifData.ISO,
      MaxApertureValue: exifData.MaxApertureValue,
      MeteringMode: exifData.MeteringMode,
      SensingMethod: exifData.SensingMethod,
      ShutterSpeedValue: exifData.ShutterSpeedValue
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form className={'form'} onSubmit={this.handleSubmit}>
        <div className='exif__fields-left-section exif__fields-section'>
          <div className='exif__label'>Aperture Value:</div>
          <input className='exif__field' type={'text'} name={'ApertureValue'} onChange={this.handleChange} value={this.state.ApertureValue} />
          <div className='exif__label'>Color Space:</div>
          <input className='exif__field' type={'text'} name={'ColorSpace'} onChange={this.handleChange} value={this.state.ColorSpace} />
          <div className='exif__label'>Compressed Bits Per Pixel:</div>
          <input className='exif__field' type={'text'} name={'CompressedBitsPerPixel'} onChange={this.handleChange} value={this.state.CompressedBitsPerPixel} />
          <div className='exif__label'>Create Date:</div>
          <input className='exif__field' type={'text'} name={'CreateDate'} onChange={this.handleChange} value={this.state.CreateDate} />
          <div className='exif__label'>Date Time Original:</div>
          <input className='exif__field' type={'text'} name={'DateTimeOriginal'} onChange={this.handleChange} value={this.state.DateTimeOriginal} />
        </div>
        <div className='exif__fields-left-section exif__fields-section'>
          <div className='exif__label'>Exif Image Height:</div>
          <input className='exif__field' type={'text'} name={'ExifImageHeight'} onChange={this.handleChange} value={this.state.ExifImageHeight} />
          <div className='exif__label'>Exif Image Width:</div>
          <input className='exif__field' type={'text'} name={'ExifImageWidth'} onChange={this.handleChange} value={this.state.ExifImageWidth} />
          <div className='exif__label'>Exposure Compensation:</div>
          <input className='exif__field' type={'text'} name={'ExposureCompensation'} onChange={this.handleChange} value={this.state.ExposureCompensation} />
          <div className='exif__label'>F-Number:</div>
          <input className='exif__field' type={'text'} name={'FNumber'} onChange={this.handleChange} value={this.state.FNumber} />
          <div className='exif__label'>Flash:</div>
          <input className='exif__field' type={'text'} name={'Flash'} onChange={this.handleChange} value={this.state.Flash} />
        </div>
        <div className='exif__fields-right-section exif__fields-section'>
          <div className='exif__label'>Focal Length:</div>
          <input className='exif__field' type={'text'} name={'FocalLength'} onChange={this.handleChange} value={this.state.FocalLength} />
          <div className='exif__label'>Focal Plane Resolution Unit:</div>
          <input className='exif__field' type={'text'} name={'FocalPlaneResolutionUnit'} onChange={this.handleChange} value={this.state.FocalPlaneResolutionUnit} />
          <div className='exif__label'>Focal Plane X-Resolution:</div>
          <input className='exif__field' type={'text'} name={'FocalPlaneXResolution'} onChange={this.handleChange} value={this.state.FocalPlaneXResolution} />
          <div className='exif__label'>Focal Plane Y-Resolution:</div>
          <input className='exif__field' type={'text'} name={'FocalPlaneYResolution'} onChange={this.handleChange} value={this.state.FocalPlaneYResolution} />
          <div className='exif__label'>Interop Offset:</div>
          <input className='exif__field' type={'text'} name={'InteropOffset'} onChange={this.handleChange} value={this.state.InteropOffset} />
        </div>
        <div className='exif__fields-right-section exif__fields-section'>
          <div className='exif__label'>Max Aperture Value:</div>
          <input className='exif__field' type={'text'} name={'MaxApertureValue'} onChange={this.handleChange} value={this.state.MaxApertureValue} />
          <div className='exif__label'>Metering Mode:</div>
          <input className='exif__field' type={'text'} name={'MeteringMode'} onChange={this.handleChange} value={this.state.MeteringMode} />
          <div className='exif__label'>Sensing Method:</div>
          <input className='exif__field' type={'text'} name={'SensingMethod'} onChange={this.handleChange} value={this.state.SensingMethod} />
          <div className='exif__label'>Shutter Speed Value:</div>
          <input className='exif__field' type={'text'} name={'ShutterSpeedValue'} onChange={this.handleChange} value={this.state.ShutterSpeedValue} />
          <div className='exif__label'>ISO:</div>
          <input className='exif__field' type={'text'} name={'ISO'} onChange={this.handleChange} value={this.state.ISO} />
        </div>
        <div className='exif__edit-submit'>
          <button className={'general__btn exif__submit-btn'}>Save</button>
        </div>
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

    const cookies = new Cookies();

    RestClient.updateEditedPhoto(cookies.get('token'), this.props.photoId, this.state)
      .then(res => {
        window.location = '/gallery';
      })
      .catch(err => {
        console.error(err);
      });
  }
}
