import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCommentVote, handleDeleteComment } from '../actions/shared';

class Comment extends Component {
  triggerUpVote = () => {
    const { dispatch, cid } = this.props;
    dispatch(handleCommentVote(cid, 'upVote'));
  };

  triggerDownVote = () => {
    const { dispatch, cid } = this.props;
    dispatch(handleCommentVote(cid, 'downVote'));
  };

  triggerDelete = () => {
    const { dispatch, cid, pid } = this.props;
    dispatch(handleDeleteComment(cid, pid));
  };

  render() {
    const { body, toggleEdit } = this.props;

    return (
      <div className='comment'>
        <div className='content'>
          <span className='body'>{body}</span>
        </div>
        <div className='control'>
          <button className='btn' type='button' onClick={this.triggerUpVote}>Vote Up</button>
          <button className='btn' type='button' onClick={this.triggerDownVote}>Vote Down</button>
          <button className='btn' type='button' onClick={toggleEdit}>Edit</button>
          <button className='btn' type='button' onClick={this.triggerDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({comments}, {cid, toggleEdit}) {
  return {
    body: comments[cid].body,
    pid: comments[cid].parentId,
    toggleEdit
  };
}

export default connect(mapStateToProps)(Comment);