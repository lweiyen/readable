function generateId () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const formatPost = (title, body, author, category) => ({
  id: generateId(),
  timestamp: Date.now(),
  title,
  body,
  author,
  category
});

export const formatComment = (body, author, parentId) => ({
  id: generateId(),
  timestamp: Date.now(),
  body,
  author,
  parentId
});

export const itemSort = (a, b, items, sortMethod) => {
  const [ timeA, timeB, voteA, voteB ] =
    [ items[a].timestamp, items[b].timestamp, items[a].voteScore, items[b].voteScore ];

  switch(sortMethod) {
    case 'TimeNewToOld' :
      return timeB - timeA;
    case 'TimeOldToNew' :
      return timeA - timeB;
    case 'VoteHighToLow' :
      return voteB - voteA;
    case 'VoteLowToHigh' :
      return voteA - voteB;
    default :
      return timeB- timeA;
  }
}