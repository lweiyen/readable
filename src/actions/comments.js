export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CAST_COMMENT_VOTE = 'CAST_COMMENT_VOTE';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_PARENT_DELETED = 'UPDATE_PARENT_DELETED';

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

export function editComment (cid, timestamp, body) {
  return {
    type: EDIT_COMMENT,
    cid,
    timestamp,
    body
  };
}

export function castCommentVote (cid, option) {
  return {
    type: CAST_COMMENT_VOTE,
    cid,
    option
  };
}

export function deleteComment (cid) {
  return {
    type: DELETE_COMMENT,
    cid
  };
}

export function createComment (comment) {
  return {
    type: CREATE_COMMENT,
    comment
  };
}

export function updateParentDeleted (pid) {
  return {
    type: UPDATE_PARENT_DELETED,
    pid
  };
}