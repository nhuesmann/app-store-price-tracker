const request = require('request-promise');
const Nightmare = require('nightmare');
const { ObjectId } = require('mongodb');

const Category = require('../models/category');
const randomUserAgent = require('../scrapeScripts/useragent');

exports.categoryDetail = async function (req, res, next) {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  let category = await Category.findOne({ _id: id })
    .populate('apps', ['id', 'name']);
    // .populate('endpoint');

  res.send(category);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

exports.categoriesSync = async function (req, res, next) {
  let genres = await request({
    uri: 'https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres?id=36',
    json: true,
  });

  genres = genres['36'].subgenres;
  categories = buildCategoriesReduce(genres);

  let categoriesSaved = await Promise.all(categories.map(cat =>
    Category.findOneAndUpdate(
      { id: cat.id },
      { id: cat.id, name: cat.name, url: cat.url },
      { new: true, upsert: true },
    )
  ));

  res.send(categoriesSaved);

  function buildCategoriesReduce(genres, parentGenre, reduceArray) {
    return Object.keys(genres).reduce((prev, curr) => {
      prev = reduceArray || prev;

      if (genres.hasOwnProperty(curr)) {
        let obj = {
          id: genres[curr].id,
          name: parentGenre ? `${parentGenre} - ${genres[curr].name}` : genres[curr].name,
          url: genres[curr].url,
        };

        prev.push(obj);

        return genres[curr].subgenres
          ? buildCategoriesReduce(genres[curr].subgenres, genres[curr].name, prev)
          : prev;
      }
    }, reduceArray || []);
  }
};

exports.categoriesSyncScrape = async function (req, res, next) {
  const homePage = 'https://itunes.apple.com/us/genre/ios/id36';
  const nightmare = new Nightmare();
  const userAgent = randomUserAgent();

  let categories = await nightmare
    .useragent(userAgent)
    .goto(homePage)
    .inject('js', `${__dirname}/../scrapeScripts/jquery.min.js`)
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

        categories.push({
          id,
          name,
          url,
        });
      });

      return categories;
    })
    .end();

  let categoriesSaved = await Promise.all(categories.map(cat =>
    Category.findOneAndUpdate(
      { id: cat.id },
      { id: cat.id, name: cat.name, url: cat.url },
      { new: true, upsert: true },
    )
  ));

  res.send(categoriesSaved);
};
