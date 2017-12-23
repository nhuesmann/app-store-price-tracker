const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/apptracker_test', { useMongoClient: true });
  mongoose.connection.once('open', () => done()).on('error', (error) => {
    console.warn('Warning', error);
  });
});

// TODO: set up above to match index.js
