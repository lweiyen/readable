const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
const credentials = process.env.REACT_APP_BACKEND ? 'include' : 'same-origin';
const headers = {
  Accept: 'application/json',
  Authorization: "test"
}

function renameKeys(obj, keyName) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = obj[key][keyName];
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

const getAllCategories = () =>
  fetch(`${api}/categories`, { headers, credentials } )
    .then(res => res.json())
    .then(data => renameKeys(data.categories, 'name'));

const getAllPosts = () =>
  fetch(`${api}/posts`, { headers, credentials } )
    .then(res => res.json())
    .then(data => renameKeys(data, 'id'));

export const getPostComments = (pid) =>
  fetch(`${api}/posts/${pid}/comments`, { headers,  credentials } )
    .then(res => res.json())
    .then(data => renameKeys(data, 'id'));

export const getInitialData = () =>
  Promise.all([
    getAllPosts(),
    getAllCategories()
  ]).then(([posts, categories]) => ({
    posts,
    categories
  }));

export const voteOnPost = (pid, option) =>
  fetch(`${api}/posts/${pid}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
    body: JSON.stringify({ option })
  }).then(res => res.json());
  
export const updatePost = (pid, title, body) =>
  fetch(`${api}/posts/${pid}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
    body: JSON.stringify({ title, body })
  }).then(res => res.json());
        
export const removePost = (pid) =>
  fetch(`${api}/posts/${pid}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
  }).then(res => res.json());

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
    body: JSON.stringify(post)
  }).then(res => res.json());

export const voteOnComment = (cid, option) =>
  fetch(`${api}/comments/${cid}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
    body: JSON.stringify({ option })
  }).then(res => res.json());
  
export const updateComment = (cid, timestamp, body) =>
  fetch(`${api}/comments/${cid}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
    body: JSON.stringify({ timestamp, body })
  }).then(res => res.json());
        
export const removeComment = (cid) =>
  fetch(`${api}/comments/${cid}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
  }).then(res => res.json());

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials,
    body: JSON.stringify(comment)
  }).then(res => res.json());
