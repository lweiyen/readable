import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import sortMethod from './sortMethod';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  categories,
  posts,
  comments,
  sortMethod,
  loadingBar: loadingBarReducer
})