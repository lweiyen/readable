import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleEditComment } from '../actions/shared';

class CommentEdit extends Component {
  state = {
    body: this.props.body
  }

  componentDidMount(){
    this.bodyText.focus();
  }

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.id]: e.target.value
    }))
  };

  handleSummit = (e) => {
    const { body } = this.state;
    const { dispatch, cid } = this.props;

    e.preventDefault();
    dispatch(handleEditComment(cid, body))
      .then(this.props.toggleEdit);
  };

  render() {
    const { body } = this.state;
    const { toggleEdit, loading } = this.props;

    return (
      <form className='comment' onSubmit={this.handleSummit}>
        <div className='content'>
          <textarea
            id='body'
            placeholder='Enter comment here...'
            value={body}
            onChange={this.handleChange}
            className='textarea-body'
            ref={(input) => { this.bodyText = input; }} 
          />        
        </div>
        <div className='control'>
          <button className='btn' type='submit' disabled={loading||body===''}>Submit</button>
          <button className='btn' type='button' onClick={toggleEdit}>Cancel</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps ({comments, loadingBar}, {cid, toggleEdit}) {
  return {
    body: comments[cid].body,
    toggleEdit,
    loading: loadingBar? loadingBar.default === 1 : true
  };
}

export default connect(mapStateToProps)(CommentEdit);