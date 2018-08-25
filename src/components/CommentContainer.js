import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import CommentEdit from './CommentEdit';

class CommentContainer extends Component {
  state = {
    editComment: false
  }

  toggleEdit = () => this.setState(prevState => ({editComment: !prevState.editComment}));

  render() {
    const { comment, cid } = this.props;
    const { author, voteScore, timestamp } = comment;
    const timeString = new Date(timestamp).toLocaleString();

    return (
      <div className='comment-container'>
        <div className='header'>
          <span> {author} commented at {timeString} </span>
          <span> Votes: {voteScore} </span>
        </div>
        {this.state.editComment?
          <CommentEdit cid={cid} toggleEdit={this.toggleEdit} />
         :<Comment cid={cid} toggleEdit={this.toggleEdit} />}
      </div>
    );
  }
}

function mapStateToProps ({comments}, {cid}) {
  return {
    comment: comments[cid],
    cid
  };
}

export default connect(mapStateToProps)(CommentContainer);