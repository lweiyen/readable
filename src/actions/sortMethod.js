export const UPDATE_SORT_METHOD = 'UPDATE_SORT_METHOD';

export function updateSortMethod (method) {
  return {
    type: UPDATE_SORT_METHOD,
    method
  };
}