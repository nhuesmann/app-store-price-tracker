const userAgentData = require('./useragent-data');

const defaultOptions = {
  platforms: ['desktop browser', 'mobile browser', 'mobile device', 'mobile os']
};

const randomIterator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomUserAgent = (options = defaultOptions) => {
  let limitPlatforms = options.platforms;
  let filteredData = userAgentData.filter(userAgent => {
    return limitPlatforms.indexOf(userAgent.platform) > -1;
  });

  return filteredData[randomIterator(0, filteredData.length - 1)].userAgent;
};

module.exports = randomUserAgent;
