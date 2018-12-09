import React from 'react';

export default class SingleFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.filter.type,
      leftInputValue: '',
      rightInputValue: '',
      query: '',
    }

    this.handleLeftChange = this.handleLeftChange.bind(this);
    this.handleRightChange = this.handleRightChange.bind(this);
  }

  sendQuery() {
    const { type, leftInputValue, rightInputValue } = this.state;
    const { handleFilterChange, filter } = this.props;

    if (type === 'double') {
      this.setState({
        query: (leftInputValue === '' && rightInputValue === '')
          ? ''
          : ((leftInputValue === '' && rightInputValue !== '')
            ? { $lt: rightInputValue }
            : ((leftInputValue !== '' && rightInputValue === '')
              ? { $gt: leftInputValue }
              : { $gt: leftInputValue, $lt: rightInputValue }))
      }, () => handleFilterChange('exif.' + filter.databaseName, this.state.query));
    } else {
      this.setState({ query: (leftInputValue !== '' ? leftInputValue : '') },
        () => handleFilterChange('exif.' + filter.databaseName, this.state.query));
    }
  }

  handleLeftChange(event) {
    this.setState({ leftInputValue: event.target.value }, () => this.sendQuery());
  }

  handleRightChange(event) {
    this.setState({ rightInputValue: event.target.value }, () => this.sendQuery());
  }

  render() {
    const { filter } = this.props;
    const { leftInputValue, rightInputValue } = this.state;
    const placeholder = filter.type === 'double' ? 'from' : 'value';

    return (
      <div className='filter__container'>
        <div className='filter__wrapper'>
          <input type='text' id='name'
            onChange={this.handleLeftChange}
            className='form__input'
            placeholder={placeholder}
          />
          <label htmlFor='name' className='form__label'>
            {filter.name}
          </label>
        </div>

        {
          filter.type === 'double' &&
          <div className='filter__container'>
            <input type='text' id='name'
              onChange={this.handleRightChange}
              className='form__input'
              placeholder='to'
            />
          </div>
        }
      </div>
    );
  }
}
