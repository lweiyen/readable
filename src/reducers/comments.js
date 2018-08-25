import { RECEIVE_COMMENTS, DELETE_COMMENT, CAST_COMMENT_VOTE, EDIT_COMMENT, CREATE_COMMENT, UPDATE_PARENT_DELETED } from '../actions/comments';

export default function comments (state = {}, action) {

  switch(action.type) {
    case RECEIVE_COMMENTS :
      return {
        ...state,
        ...action.comments
      };
    case CAST_COMMENT_VOTE :
      return {
        ...state,
        [action.cid]: {
          ...state[action.cid],
          voteScore: state[action.cid].voteScore + (action.option==='upVote'? 1 : -1)
        }
      };
    case DELETE_COMMENT :
      return {
        ...state,
        [action.cid]: {
          ...state[action.cid],
          deleted: true
        }
      };
    case EDIT_COMMENT :
      return {
        ...state,
        [action.cid]: {
          ...state[action.cid],
          timestamp: action.timestamp,
          body: action.body
        }
      };
    case CREATE_COMMENT :
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
          parentDeleted: false,
          deleted: false,
          voteScore: 1
        }
      };
    case UPDATE_PARENT_DELETED :
      const deletedComments = Object.keys(state)
        .filter(key => state[key].parentId === action.pid)
        .map(key => {
          const value = { ...state[key], parentDeleted: true };
          return { [key]: value };
        });
      return Object.assign(state, ...deletedComments);
    default :
      return state;
  }
}