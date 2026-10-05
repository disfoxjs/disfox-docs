module.exports = {
  fields: ['title', 'heading', 'content', 'keywords'],
  storeFields: ['title', 'heading', 'content', 'url'],
  searchOptions: {
    boost: {title: 5, heading: 3, keywords: 2},
    prefix: true,
    fuzzy: 0.2,
    combineWith: 'AND',
  },
};
