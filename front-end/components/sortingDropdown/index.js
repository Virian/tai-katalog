import React from 'react';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {},
    }
  }

  createQuery(id) {
    const { handleSelectChange } = this.props;

    if (id === 0) {
      this.setState({
        query: { "exif.FocalLength": 1 }
      }, () => handleSelectChange( this.state.query));
    } else if (id === 1) {
      this.setState({
        query: { "exif.FocalLength": -1 }
      }, () => handleSelectChange( this.state.query));
    } else if (id === 2) {
      this.setState({
        query: { "exif.ShutterSpeedValue": 1 }
      }, () => handleSelectChange(this.state.query));
    } else if (id === 3) {
      this.setState({
        query: { "exif.ShutterSpeedValue": -1 }
      }, () => handleSelectChange(this.state.query));
    } else if (id === 4) {
      this.setState({
        query: { "exif.ISO": 1 }
      }, () => handleSelectChange(this.state.query));
    } else if (id === 5) {
      this.setState({
        query: { "exif.ISO": -1 }
      }, () => handleSelectChange(this.state.query));
    }
  }

  render() {
    const { option } = this.props;

    return (
      <div className='sort__single' onClick={() => this.createQuery(option.id)}>
        {option.title}
      </div>
    );
  }
}
