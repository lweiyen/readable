import { getInitialData, removePost, voteOnPost, updatePost, addPost, getPostComments, removeComment, voteOnComment, updateComment, addComment } from '../utils/api';
import { formatPost, formatComment } from '../utils/common';
import { receivePosts, deletePost, castPostVote, editPost, createPost, setCommentsLoaded, updateCommentCount } from './posts';
import { receiveCategories } from './categories';
import { receiveComments, deleteComment, castCommentVote, editComment, createComment, updateParentDeleted } from './comments';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ posts, categories }) => {
        dispatch(receivePosts(posts));
        dispatch(receiveCategories(categories));
        dispatch(hideLoading());
      });
  };
}

export function handleDeletePost (pid) {
  return (dispatch) => {
    dispatch(showLoading());
    return removePost(pid)
      .then(() => {
        dispatch(deletePost(pid));
        dispatch(updateParentDeleted(pid));
        dispatch(hideLoading());
      });
  };
}

export function handlePostVote (pid, option) {
  return (dispatch) => {
    dispatch(showLoading());
    return voteOnPost(pid, option)
      .then(() => {
        dispatch(castPostVote(pid, option));
        dispatch(hideLoading());
      });
  };
}

export function handleEditPost (pid, title, body) {
  return (dispatch) => {
    dispatch(showLoading());
    return updatePost(pid, title, body)
      .then(() => {
        dispatch(editPost(pid, title, body));
        dispatch(hideLoading());
      });
  };
}

export function handleNewPost (title, body, author, category) {
  return (dispatch) => {
    const post = formatPost(title, body, author, category);

    dispatch(showLoading());
    return addPost(post)
      .then(() => {
        dispatch(createPost(post));
        dispatch(hideLoading());
      });
  };
}

export function loadPostComments (pid) {
  return (dispatch) => {
    dispatch(showLoading());
    return getPostComments(pid)
      .then((comments) => {
        dispatch(setCommentsLoaded(pid));
        dispatch(receiveComments(comments));
        dispatch(hideLoading());
      });
  };
}

export function handleDeleteComment (cid, pid) {
  return (dispatch) => {
    dispatch(showLoading());
    return removeComment(cid)
      .then(() => {
        dispatch(deleteComment(cid));
        dispatch(updateCommentCount(pid, -1));
        dispatch(hideLoading());
      });
  };
}

export function handleCommentVote (cid, option) {
  return (dispatch) => {
    dispatch(showLoading());
    return voteOnComment(cid, option)
      .then(() => {
        dispatch(castCommentVote(cid, option));
        dispatch(hideLoading());
      });
  };
}

export function handleEditComment (cid, body) {
  const timestamp = Date.now();

  return (dispatch) => {
    dispatch(showLoading());
    return updateComment(cid, timestamp, body)
      .then(() => {
        dispatch(editComment(cid, timestamp, body));
        dispatch(hideLoading());
      });
  };
}

export function handleNewComment (body, author, pid) {
  return (dispatch) => {
    const comment = formatComment(body, author, pid);

    dispatch(showLoading());
    return addComment(comment)
      .then(() => {
        dispatch(createComment(comment));
        dispatch(updateCommentCount(pid, 1));
        dispatch(hideLoading());
      });
  };
}