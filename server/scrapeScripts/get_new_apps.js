const { getAppGenres, getAppIds } = require('./helper');

// let genres = getAppGenres();
// genres.then(console.log);

const Genres = {
  Finance: 'https://itunes.apple.com/us/genre/ios-finance/id6015?mt=8',
  // Productivity: 'https://itunes.apple.com/us/genre/ios-productivity/id6007?mt=8',
};

const genreKeys = Object.keys(Genres).filter(genre => Genres.hasOwnProperty(genre));

const testAlphabet = [
  'A', //'B', 'C',
];

main();

async function getAppsFromIds(ids) {
  /*
   * sends 200 ids at a time to iTunes
   *    how to chunk into 200??
   * forwards the responses to the POST endpoint for creating new apps
   * BATCH send function???? Or only one at a time?
   */
}

async function main() {
  for (let genre of genreKeys) {
    // this will be executed for each genre. All genres are done SYNC
    let begin = new Date();
    console.log(`Starting ${genre}: ${begin.toString()}`);

    const links = testAlphabet.map(alphaChar => {
      let baseUrl = Genres[genre];
      return getAppIds(baseUrl, alphaChar);
    });

    let ids = await Promise.all(links);
    ids = [].concat(...ids);
    let end = new Date();
    console.log(`Finished ${genre}: ${end.toString()}`);
    console.log(`Total time for ${genre}: ${(end - begin) / 1000} seconds`);
    console.log(`Total ids for ${genre}: ${ids.length}`);

    // console.log('Ids:', ids);
    // do some db operation?? Or add these to a big object and do DB once done with all genres???
  }
}

/*
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
*/

/**
 * TODO: figure out where to use async (do reduce function for all pages in letter?
 * push to array if hasmore)
 * TODO: how to delegate alpha into threads? set max threads in program and update
 * that amount when a process gets called?
 */

// TODO: can't use Promise.all because it assumes each scraper is not going to encounter issues.
// If a single one does, the entire Promise.all call fails.
// Need to instead add the contents to an array when complete... or save to DB? Think about it.

// only run the scraper daily to check for new apps! otherwise it's not needed!
// start writing the process for pinging API once an hour to check for updates

//////////// TODO: SCHEDULED TASKS ////////////

// DAILY:
// Run scraper for new apps and any new genres

// HOURLY:
// Check all apps in mongo and request 200 at a time for changes. Record last checked timestamp.

/**
 * WEBHOOKS:
 * App update: app version has increased
 * Price increase/decrease: app price has changed (differentiate these bc ppl mainly want to know drops)
 * New app added: new document added to mongodb
 */

//////////// TODO: THINK ABOUT / FIGURE OUT ////////////

/**
 * Exclude some apps from being updated every hour? Maybe set a threshold for total app downloads
 * Related to above, find out how appshopper differentiates popular from all (the junk apps)
 * Don't show to option for price alert if app is free (set that up in the model?)
 * EXCLUDE FROM SEARCH IF APP IS FREE?
 * separate price and update tasks? Doesn't make sense, should do all at once
 * How to give people option for tracking app updates or price drops
 * Developer alerts?
 * Similar apps?
 * Add RSS feed from Apple for all the featured ones!
 */

/**
 * TODO: change above - the media types should be in the script file,
 * it should choose based on what it is scraping - i.e. software, movies, etc
 * const mediaTypes = [movie, podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook]
 * fix mediaTypes to be entity (or use media??). the entity types are different, there are more, esp music
 */

/**
 * start a scraper for each genre
 * create array of A through #, have two scrapers going per genre working outside in and saving to an array.
 * have scrapr check if the currently observed name is in the array. if so, done.
 * UPDATE: above is very bad. Cannot check an array for the presence of an app... highly unoptomized
 */
