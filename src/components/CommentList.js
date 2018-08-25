import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentContainer from './CommentContainer';
import NewCommentForm from './NewCommentForm';
import { itemSort } from '../utils/common';
import { loadPostComments } from '../actions/shared';

class CommentList extends Component {
  state = {
    newComment: false
  };

  componentDidMount() {
    const { areCommentsLoaded, pid, dispatch } = this.props;

    if (!areCommentsLoaded) {
      dispatch(loadPostComments(pid));
    }
  }

  toggleNewComment = () => this.setState(prevState => ({newComment: !prevState.newComment}));

  render() {
    const { commentIds, loading, pid } = this.props;

    return (
      <div className='list-container'>
        {commentIds.length===0 && loading===false?
          (<h3 className='center'> There is no comment on this post. </h3>)
         :(<div>
             <h3 className='center'> Comment(s) on this Post </h3>
             <ul className='list'>
               {commentIds.map((cid) => (
               <li key={cid}>
                 <CommentContainer cid={cid} />
               </li>))}
             </ul>
           </div>)}
        {this.state.newComment?
          <NewCommentForm pid={pid} toggleNewComment={this.toggleNewComment} />:
          <button className='new-btn' type='button' onClick={this.toggleNewComment} >Add Comment</button>}
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments, loadingBar, sortMethod }, { pid }) {
  return {
    areCommentsLoaded: posts[pid].areCommentsLoaded,
    commentIds: Object.keys(comments)
      .filter((commentId) => comments[commentId].deleted===false && comments[commentId].parentId === pid)
      .sort((a,b) => itemSort(a, b, comments, sortMethod)),
    loading: loadingBar? loadingBar.default === 1 : true,
    pid
  }
}

export default connect(mapStateToProps)(CommentList);