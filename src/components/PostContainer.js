import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import PostEdit from './PostEdit';

class PostContainer extends Component {
  state = {
    editPost: false
  }

  toggleEdit = () => this.setState(prevState => ({editPost: !prevState.editPost}));

  render() {
    const { post, pid } = this.props;
    const { author, voteScore, commentCount, timestamp } = post;
    const timeString = new Date(timestamp).toLocaleString();

    return (
      <div className='post-container'>
        <div className='header'>
          <span> {author} posted at {timeString} </span>
          <span> Comments: {commentCount} </span>
          <span> Votes: {voteScore} </span>
        </div>
        {this.state.editPost?
          <PostEdit pid={pid} toggleEdit={this.toggleEdit} />
         :<Post pid={pid} toggleEdit={this.toggleEdit} />}
      </div>
    );
  }
}

function mapStateToProps ({posts}, {pid}) {
  return {
    post: posts[pid],
    pid
  };
}

export default connect(mapStateToProps)(PostContainer);