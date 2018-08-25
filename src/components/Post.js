import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handlePostVote, handleDeletePost } from '../actions/shared';
import { withRouter } from 'react-router-dom';

class Post extends Component {
  triggerUpVote = () => {
    const { dispatch, pid } = this.props;
    dispatch(handlePostVote(pid, 'upVote'));
  };

  triggerDownVote = () => {
    const { dispatch, pid } = this.props;
    dispatch(handlePostVote(pid, 'downVote'));
  };

  triggerDelete = () => {
    const { dispatch, pid } = this.props;
    dispatch(handleDeletePost(pid));
  };

  toPost = (pid, category) => () => {
    const pathname = `/${category}/${pid}`;

    if (pathname !== this.props.location.pathname) {
      this.props.history.push(pathname);
    }
  }

  render() {
    const { title, body, toggleEdit, pid, category } = this.props;

    return (
      <div className='post'>
        <div className='post-content' onClick={this.toPost(pid, category)}>
          <span className='post-title'>{title}</span>
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

function mapStateToProps ({posts}, {pid, toggleEdit}) {
  return {
    title: posts[pid].title,
    body: posts[pid].body,
    pid,
    category: posts[pid].category,
    toggleEdit
  };
}

export default withRouter(connect(mapStateToProps)(Post));