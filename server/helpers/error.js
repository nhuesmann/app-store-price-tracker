exports.zeroResults = function zeroResults(resource) {
  return {
    error: 'Zero Results',
    message: `The requested ${resource} does not exist.`,
  };
};

exports.nonObjectID = function nonObjectID() {
  return {
    error: 'Non ObjectID',
    message: 'Not a valid ObjectID.',
  };
};
