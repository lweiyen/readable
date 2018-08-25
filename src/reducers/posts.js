import { RECEIVE_POSTS, DELETE_POST, CAST_POST_VOTE, EDIT_POST, CREATE_POST, SET_COMMENTS_LOADED, UPDATE_COMMENT_COUNT } from '../actions/posts';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      const posts = Object.keys(action.posts).map(key => {
        const value = { ...action.posts[key], areCommentsLoaded: action.posts[key].commentCount===0 };
        return { [key]: value };
      });
      return Object.assign(state, ...posts);
    case CAST_POST_VOTE :
      return {
        ...state,
        [action.pid]: {
          ...state[action.pid],
          voteScore: state[action.pid].voteScore + (action.option==='upVote'? 1 : -1)
        }
      };
    case DELETE_POST :
      return {
        ...state,
        [action.pid]: {
          ...state[action.pid],
          deleted: true
        }
      };
    case EDIT_POST :
      return {
        ...state,
        [action.pid]: {
          ...state[action.pid],
          title: action.title,
          body: action.body
        }
      };
    case CREATE_POST :
      return {
        ...state,
        [action.post.id]: {
          ...action.post,
          areCommentsLoaded: true,
          commentCount: 0,
          deleted: false,
          voteScore: 1
        }
      };
    case SET_COMMENTS_LOADED :
      return {
        ...state,
        [action.pid]: {
          ...state[action.pid],
          areCommentsLoaded: true
        }
      };
    case UPDATE_COMMENT_COUNT :
      return {
        ...state,
        [action.pid]: {
          ...state[action.pid],
          commentCount: state[action.pid].commentCount + action.value
        }
      };
    default :
      return state;
  }
}