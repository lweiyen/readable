import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostContainer from './PostContainer';
import PageNotFound from './PageNotFound';
import CommentList from './CommentList';

class PostPage extends Component {
  isPostValid = () => {
    const { posts, category, pid, postDeleted } = this.props;

    return postDeleted ? false : posts[pid].category === category;
  }

  render() {
    const { pid, loading } = this.props;

    return this.isPostValid()?(
      <div>
        <PostContainer pid={pid} />
        <CommentList pid={pid} />
      </div>
    ):(<PageNotFound loading={loading} />);
  }
}

function mapStateToProps ({ posts, loadingBar }, props) {
  const { category, pid } = props.match.params;

  return {
    pid,
    category,
    posts,
    postDeleted: posts[pid]?posts[pid].deleted:true,
    loading: loadingBar? loadingBar.default === 1 : true
  };
}

export default connect(mapStateToProps)(PostPage);