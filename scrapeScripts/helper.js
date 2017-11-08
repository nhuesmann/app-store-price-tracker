// get all genres

// for each genre, the following will occur /// SYNCHRONOUS LOOP OVER GENRES ///

// iterate over each letter & the numbers of that genre ( 27 )
//// ASYNC 4 THREADS/LETTERS AT A TIME?? ////

// for each letter, the following will occur

// iterate each page of that letter (20-30)

// TODO: rename this file!

const Nightmare = require('nightmare');
const randomUserAgent = require('./useragent');

getAppCategories().then(console.log);

async function getAppGenres() {
  const homePage = 'https://itunes.apple.com/us/genre/ios/id36';
  const nightmare = new Nightmare({ show: true });

  // Go to initial start page, get a list of all genres and their links
  try {
    return nightmare
      .goto(homePage)
      .wait('.top-level-genre')
      .evaluate(() => [...document.querySelectorAll('.top-level-genre')]
          .reduce((obj, el) => {
            if (el) {
              let genre = el.innerText;
              let link = el.href;
              genre = genre.replace(/\W/g, ' ').replace(/\s+/g, '_');
              obj[genre] = link;
            }

            return obj;
          }, {}))
      .end();
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getAppCategories() {
  const homePage = 'https://itunes.apple.com/us/genre/ios/id36';
  const nightmare = new Nightmare({ show: true });

  try {
    return nightmare
      .goto(homePage)
      .inject('js', `${__dirname}/jquery.min.js`)
      .wait('#genre-nav')
      .evaluate(() => {
        let categories = [];

        $('#genre-nav a').each(function () {
          let name = $(this).text();
          let url = $(this).attr('href');

          if ($(this).parents('ul.top-level-subgenres').length) {
            let parent = $(this)
              .parents('ul.top-level-subgenres')
              .siblings('a.top-level-genre')
              .text();
            name = `${parent} - ${name}`;
          }

          let id = url.match(/\/id\d+\?/)[0].replace(/\D/g, '');
          url = url.replace(/\?(.*)/g, '');

          categories.push({
            id,
            name,
            url,
          });
        });

        return categories;
      })
      .end();
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getAppIds(baseUrl, alphaChar) {
  let begin = new Date();
  console.log(`Starting ${alphaChar}: ${begin.toString()}...`);
  const nightmare = new Nightmare({ show: true }); // TODO: eventually make it headless
  const userAgent = randomUserAgent();
  const initialPage = `${baseUrl}&letter=${alphaChar}&page=1#page`;

  let allIds = [];
  let hasMore;
  let page = initialPage;

  try {
    do {
      let pageData = await nightmare
      .viewport(1000, 800)
      .useragent(userAgent)
      .goto(page)
      .inject('js', `${__dirname}/jquery.min.js`)

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

      let pageIds = pageData.links.map(link => link.match(/\/id\d+\?/)[0].replace(/\D/g, ''));

      allIds = allIds.concat(pageIds);
      hasMore = pageData.more;
      page = pageData.nextPage;
    }
    while (hasMore);

    await nightmare.end();

    let end = new Date();
    console.log(`Finished ${alphaChar}: ${end.toString()}...`);
    console.log(`Total time for ${alphaChar}: ${(end - begin) / 1000} seconds`);

    return allIds;
  } catch (e) {
    console.log(e);
    return e;
  }
}

function randWaitInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  getAppGenres,
  getAppIds,
};
