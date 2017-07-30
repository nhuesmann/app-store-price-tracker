const Nightmare = require('nightmare');
const userAgentData = require('./useragent-data');

const genres = {
  Books: 'https://itunes.apple.com/us/genre/ios-books/id6018?mt=8',
  Business: 'https://itunes.apple.com/us/genre/ios-business/id6000?mt=8',
  Catalogs: 'https://itunes.apple.com/us/genre/ios-catalogs/id6022?mt=8',
  Education: 'https://itunes.apple.com/us/genre/ios-education/id6017?mt=8',
  Entertainment: 'https://itunes.apple.com/us/genre/ios-entertainment/id6016?mt=8',
  Finance: 'https://itunes.apple.com/us/genre/ios-finance/id6015?mt=8',
  Food_Drink: 'https://itunes.apple.com/us/genre/ios-food-drink/id6023?mt=8',
  Games: 'https://itunes.apple.com/us/genre/ios-games/id6014?mt=8',
  Health_Fitness: 'https://itunes.apple.com/us/genre/ios-health-fitness/id6013?mt=8',
  Lifestyle: 'https://itunes.apple.com/us/genre/ios-lifestyle/id6012?mt=8',
  Magazines_Newspapers: 'https://itunes.apple.com/us/genre/ios-magazines-newspapers/id6021?mt=8',
  Medical: 'https://itunes.apple.com/us/genre/ios-medical/id6020?mt=8',
  Music: 'https://itunes.apple.com/us/genre/ios-music/id6011?mt=8',
  Navigation: 'https://itunes.apple.com/us/genre/ios-navigation/id6010?mt=8',
  News: 'https://itunes.apple.com/us/genre/ios-news/id6009?mt=8',
  Photo_Video: 'https://itunes.apple.com/us/genre/ios-photo-video/id6008?mt=8',
  Productivity: 'https://itunes.apple.com/us/genre/ios-productivity/id6007?mt=8',
  Reference: 'https://itunes.apple.com/us/genre/ios-reference/id6006?mt=8',
  Shopping: 'https://itunes.apple.com/us/genre/ios-shopping/id6024?mt=8',
  Social_Networking: 'https://itunes.apple.com/us/genre/ios-social-networking/id6005?mt=8',
  Sports: 'https://itunes.apple.com/us/genre/ios-sports/id6004?mt=8',
  Stickers: 'https://itunes.apple.com/us/genre/ios-stickers/id6025?mt=8',
  Travel: 'https://itunes.apple.com/us/genre/ios-travel/id6003?mt=8',
  Utilities: 'https://itunes.apple.com/us/genre/ios-utilities/id6002?mt=8',
  Weather: 'https://itunes.apple.com/us/genre/ios-weather/id6001?mt=8'
};


const getAppIds = async (userAgent) => {
  const nightmare = new Nightmare({ show: true }); // TODO: eventually make it headless

  let page = 'https://itunes.apple.com/us/genre/ios-finance/id6015?mt=8&letter=A&page=19#page';
  console.log(`User Agent: ${userAgent}`);

  let allIds = [];
  let hasMore;

  try {
    do {
      let pageData = await nightmare
      .viewport(1200, 950)
      .useragent(userAgent)
      .goto(page)
      .inject('js', 'jquery.min.js')
      // .wait(randWaitInterval(500, 1000))
      .wait('#selectedcontent')
      .evaluate(function () {
        let links = [];
        let nextPage;

        $('#selectedcontent').find('a').each(function () {
          links.push($(this).attr('href'));
        });

        let more = $('.paginate-more');
        more.length > 0 ? nextPage = more.attr('href') : more = false;

        return { links, more, nextPage };
      });

      let pageIds = pageData.links.map(link => link.split('/id')[1].split('?')[0]);
      allIds = allIds.concat(pageIds);
      hasMore = pageData.more;
      page = pageData.nextPage;
    }
    while (hasMore);

    await nightmare.end();

    return allIds;
  } catch(e) {
    console.log(e);
    return e;
  }
};

const series = userAgentData.reduce(async (queue, ua) => {
  const dataArray = await queue;
  dataArray.push(await getAppIds(ua.userAgent));
  return dataArray;
}, Promise.resolve([]));

series.then(data => {
  console.log(`Completed at ${new Date().toString()}`);
})
.catch(e => console.error(e));
