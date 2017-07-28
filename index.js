const Nightmare = require('nightmare');

const getAppGenres = async () => {
  const homePage = 'https://itunes.apple.com/us/genre/ios/id36?mt=8';
  const nightmare = new Nightmare({ show: true });
  // Go to initial start page, get a list of all genres and their links
  try {
    let genres = await nightmare
      .goto(homePage)
      .wait('.top-level-genre')
      .evaluate(() => {
        return [...document.querySelectorAll('.top-level-genre')]
          .reduce((obj, el) => {
            if (el) {
              let genre = el.innerText;
              let link = el.href;
              genre = genre.replace(/\W/g, " ").replace(/\s+/g, "_");
              obj[genre] = link;
            }
            return obj;
          }, {});
      })
      .end();
    return genres;
  } catch(e) {
    console.error(e);
  }
};

// let genres = getAppGenres();
//
// genres.then(console.log);
// below is the output of getAppGenres()
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

const alphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '*'
];

// TODO: load the new Nightmare in the letter function, not each time the page changes
// TODO: figure out where to use async (do reduce function for all pages in letter? push to array if hasmore)
// TODO:

const getPageData = async (page) => {
  const nightmare = new Nightmare({ show: true });
  return await nightmare
    .viewport(1200, 950)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto(page)
    .inject('js', 'jquery.min.js')
    .wait(500)
    .evaluate(function () {
      let links = [];
      $('#selectedcontent').find('a').each(function() {
        links.push($(this).attr('href'));
      });
      let hasMore = $('.paginate-more');
      let nextPage;
      if (hasMore.length === 0) {
        hasMore = false;
      } else {
        nextPage = hasMore.attr('href');
      }
      return { links, hasMore, nextPage };
    });
    // TODO: do i need to end()? how do i call end after all pages have been scraped?
};

// try the first genre as an example
const scrape = async (genre) => {
  // placeholder for links
  var links = [];
  // establish the base URL
  var baseUrl = genres[genre];



  // const nightmare = new Nightmare({ show: true });

  // TODO: loop through all pages of letter

  try {
    // TODO: break this out into a function
    // alphabet foreach, run below process
    let letter = 'A'; // pretend we get this as function argument

    // create the first request URL
    var initialPage = `${baseUrl}&letter=${letter}&page=1#page`;

    var genreLinks = [];

    // run below while hasMore

    // let getPageData = async (page) => {
    //   return await nightmare
    //     .viewport(1200, 950)
    //     .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    //     .goto(page)
    //     .inject('js', 'jquery.min.js')
    //     .wait(500)
    //     .evaluate(function () {
    //       let links = [];
    //       $('#selectedcontent').find('a').each(function() {
    //         links.push($(this).attr('href'));
    //       });
    //       let hasMore = $('.paginate-more');
    //       let nextPage;
    //       if (hasMore.length === 0) {
    //         hasMore = false;
    //       } else {
    //         nextPage = hasMore.attr('href');
    //       }
    //       return { links, hasMore, nextPage };
    //     });
    //     // .end();
    // };

    getPageData(initialPage).then((data) => {
      // console.log('data', data);
      genreLinks = genreLinks.concat(data.links);

      if (data.hasMore) {
        console.log(data.nextPage);
        console.log(genreLinks);
      } else {
        console.log('no more data :(');
      }

    });

  } catch(e) {
    console.log(e);
  }
};

// get the app id
let applink = 'https://itunes.apple.com/us/app/a-english-speak-read-audio-books/id338982960?mt=8';
let id = applink.split('/id')[1].split('?')[0];
console.log('id', id);

// check db if saved already
// TODO: on the data model in DB, clean the trackViewUrl property by calling trackViewUrl.split('&uo=')[0]; to get rid of the unique origin.


// if not, query itunes by app id
let itunesUrl = `https://itunes.apple.com/lookup?id=${id}&entity=software`;

// TODO: change above - the media types should be in the script file, it should choose based on what it is scraping
// i.e. software, movies, etc
// const mediaTypes = [movie, podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook];
// TODO: fix mediaTypes to be entity (or use media??). the entity types are different, there are more, esp music


scrape('Books').then(() => {//async apps => {
  console.log('got links');
  // console.log(`Found ${apps.length} links.`);
  //
  // try {
  //   await nightmare
  //     .viewport(1200, 950)
  //     .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
  //     .goto(page)
  // } catch(e) {
  //
  // }
});
// get all genres on the page (save this in the DB. only do this check once a week. check if links have changed)

// start a scraper for each genre
// create array of A through #, have two scrapers going per genre working outside in and saving to an array. have scrapr check if the currently observed name is in the array. if so, done.

// when to save to DB? every 10? dont make it arbitrary... shouldbnt matter after initial db is created

// COMPONENTS:
//
// the scraper - scheduled job. checks against DB to see if exists.
