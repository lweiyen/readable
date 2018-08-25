import { UPDATE_SORT_METHOD } from '../actions/sortMethod';

export default function categories (state = 'TimeNewToOld', action) {

  switch(action.type) {
    case UPDATE_SORT_METHOD :
      return action.method;
    default :
      return state;
  }
}