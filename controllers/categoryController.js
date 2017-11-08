const Category = require('../models/category');
const Nightmare = require('nightmare');
const randomUserAgent = require('../scrapeScripts/useragent');

exports.categoryCreate = async function (req, res, next) {
  var category = new Category({
    id: req.body.id,
    name: req.body.name,
    url: req.body.url,
  });

  var saved = await category.save();
  res.send(saved.name);
};

exports.categoriesSync = async function (req, res, next) {
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

  let categoriesSaved = await Promise.all(categories.map(cat =>
    Category.findOneAndUpdate(
      { id: cat.id },
      { id: cat.id, name: cat.name, url: cat.url },
      { new: true, upsert: true },
    )
  ));

  res.send(categoriesSaved);
};
