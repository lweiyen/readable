export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_POST = 'CREATE_POST';
export const CAST_POST_VOTE = 'CAST_POST_VOTE';
export const SET_COMMENTS_LOADED = 'SET_COMMENTS_LOADED';
export const UPDATE_COMMENT_COUNT = 'UPDATE_COMMENT_COUNT';

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function editPost (pid, title, body) {
  return {
    type: EDIT_POST,
    pid,
    title,
    body
  };
}

export function castPostVote (pid, option) {
  return {
    type: CAST_POST_VOTE,
    pid,
    option
  };
}

export function deletePost (pid) {
  return {
    type: DELETE_POST,
    pid
  };
}

export function createPost (post) {
  return {
    type: CREATE_POST,
    post
  };
}

export function setCommentsLoaded (pid) {
  return {
    type: SET_COMMENTS_LOADED,
    pid
  };
}

export function updateCommentCount (pid, value) {
  return {
    type: UPDATE_COMMENT_COUNT,
    pid,
    value
  };
}