import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { updateSortMethod } from '../actions/sortMethod';

class SortInput extends Component {  
  onChange = (input) => {
    this.props.dispatch(updateSortMethod(input.value))
  };

  render() {
    const { sortMethod } = this.props;
    const options = [
      { value: 'TimeNewToOld', label: 'Time (New to Old)' },
      { value: 'TimeOldToNew', label: 'Time (Old to New)' },
      { value: 'VoteHighToLow', label: 'Vote (High to Low)' },
      { value: 'VoteLowToHigh', label: 'Vote (Low to High)' },
    ]
    return (
      <Dropdown options={options} onChange={this.onChange} value={sortMethod} />
    )
  }
}

function mapStateToProps ({ sortMethod }) {
  return {
    sortMethod
  }
}

export default connect(mapStateToProps)(SortInput);