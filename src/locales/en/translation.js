export default {
  websiteInterface: {
    title: 'RSS aggregator',
    subtitle: 'Start reading RSS today! It’s easy, it’s beautiful.',
    formPlaceholder: 'RSS link',
    example: 'Example: https://lorem-rss.hexlet.app/feed?unit=second',
  },
  buttons: {
    add: 'Add',
    lan: 'RU',
    view: 'View',
  },
  titles: {
    postsTitle: 'Posts',
    feedsTitle: 'Feeds',
  },
  message: {
    urlAlreadyExists: 'RSS already exists',
    invalidUrl: 'The link must be a valid URL',
    empty: 'It shouldn’t be empty',
    including: 'This RSS has already been added',

    parseError: 'The resource does not contain a valid RSS feed',
    networkError: 'Network error',
    loading: 'Loading feed…',
    unknownError: 'The request could not be processed',
    success: 'The RSS has been successfully loaded',
  },
}
