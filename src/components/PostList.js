import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostContainer from './PostContainer';
import NewPostForm from './NewPostForm';
import { itemSort } from '../utils/common';

class PostList extends Component {
  state = {
    newPost: false
  };

  toggleNewPost = () => this.setState(prevState => ({newPost: !prevState.newPost}));

  render() {
    const { postIds, loading } = this.props;

    return (
      <div className='list-container'>
        {postIds.length===0 && loading===false?
          (<h3 className='center'> There is no post in this category.</h3>)
         :(<ul className='list'>
          {postIds.map((pid) => (
            <li key={pid}>
              <PostContainer pid={pid} />
            </li>
          ))}
        </ul>)}
        {this.state.newPost?
          <NewPostForm toggleNewPost={this.toggleNewPost} />
         :<button className='new-btn' type='button' onClick={this.toggleNewPost} >Create New Post</button>}
      </div>
    )
  }
}

function mapStateToProps ({ posts, sortMethod, loadingBar }, { category }) {
  return {
    postIds: Object.keys(posts)
      .filter((postId) => posts[postId].deleted===false && (category === 'All' || posts[postId].category === category))
      .sort((a,b) => itemSort(a, b, posts, sortMethod)),
    loading: loadingBar? loadingBar.default === 1 : true
  }
}

export default connect(mapStateToProps)(PostList);