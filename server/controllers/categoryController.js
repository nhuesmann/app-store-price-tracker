const request = require('request-promise');
const Nightmare = require('nightmare');
const { ObjectId } = require('mongodb');
const apiError = require('../helpers/error');

const Category = require('../models/category');
const randomUserAgent = require('../scrapeScripts/useragent');

exports.GetCategory = async function GetCategory(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json(apiError.nonObjectID());
  }

  const category = await Category.findOne({ _id: id }).populate('apps', ['id', 'name']);
  // .populate('endpoint');

  if (!category) {
    return res.status(400).json(apiError.zeroResults('category'));
  }

  res.json(category);
};

exports.sync = async function sync(req, res, next) {
  function buildCategoriesReduce(genres, parentGenre, reduceArray) {
    return Object.keys(genres).reduce((prev, curr) => {
      prev = reduceArray || prev;

      const obj = {
        id: genres[curr].id,
        name: parentGenre ? `${parentGenre} - ${genres[curr].name}` : genres[curr].name,
        url: genres[curr].url,
      };

      prev.push(obj);

      return genres[curr].subgenres
        ? buildCategoriesReduce(genres[curr].subgenres, genres[curr].name, prev)
        : prev;
    }, reduceArray || []);
  }

  let genres = await request({
    uri: 'https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres?id=36',
    json: true,
  });

  genres = genres['36'].subgenres;
  const categories = buildCategoriesReduce(genres);

  const categoriesSaved = await Promise.all(categories.map(cat =>
    Category.findOneAndUpdate(
      { id: cat.id },
      { id: cat.id, name: cat.name, url: cat.url },
      { new: true, upsert: true },
    )));

  // was testing this solution for batch upsert. Not stable
  // const catObjs = categories.map(cat => ({
  //   updateOne: {
  //     filter: {
  //       id: cat.id
  //     },
  //     update: {
  //       id: cat.id,
  //       name: cat.name,
  //       url: cat.url,
  //     },
  //     upsert: true
  //   }
  // }));
  //
  // const categoriesSaved = await Category.collection.bulkWrite(catObjs);

  res.json(categoriesSaved);
};

exports.syncScrape = async function syncScrape(req, res, next) {
  const homePage = 'https://itunes.apple.com/us/genre/ios/id36';
  const nightmare = new Nightmare();
  const userAgent = randomUserAgent();

  const categories = await nightmare
    .useragent(userAgent)
    .goto(homePage)
    .inject('js', `${__dirname}/../scrapeScripts/jquery.min.js`)
    .wait('#genre-nav')
    .evaluate(() => {
      const scrapedCategories = [];

      $('#genre-nav a').each(function scrapeCategories() {
        let name = $(this).text();
        const url = $(this).attr('href');

        if ($(this).parents('ul.top-level-subgenres').length) {
          const parent = $(this)
            .parents('ul.top-level-subgenres')
            .siblings('a.top-level-genre')
            .text();
          name = `${parent} - ${name}`;
        }

        const id = url.match(/\/id\d+\?/)[0].replace(/\D/g, '');

        scrapedCategories.push({
          id,
          name,
          url,
        });
      });

      return scrapedCategories;
    })
    .end();

  const categoriesSaved = await Promise.all(categories.map(cat =>
    Category.findOneAndUpdate(
      { id: cat.id },
      { id: cat.id, name: cat.name, url: cat.url },
      { new: true, upsert: true },
    )));

  res.json(categoriesSaved);
};
