const { ObjectID } = require('mongodb');

const App = require('../../models/app');
const Developer = require('../../models/developer');
const Category = require('../../models/category');
const User = require('../../models/user');

// const appOneId = new ObjectID();
// const appTwoId = new ObjectID();

const category = {
  _id: new ObjectID(),
  id: 6014,
  name: 'Games',
  url: 'https://itunes.apple.com/us/genre/ios-games/id6014',
};

const developer = {
  _id: new ObjectID(),
  id: 300186801,
  name: 'SQUARE ENIX INC',
  sellerName: 'SQUARE ENIX INC',
  url: 'https://itunes.apple.com/us/developer/square-enix-inc/id300186801',
};

const app = {
  _id: new ObjectID(),
  id: 1021566244,
  name: 'FINAL FANTASY VII',
  nameCensored: 'FINAL FANTASY VII',
  url: 'https://itunes.apple.com/us/app/final-fantasy-vii/id1021566244',
  developer: developer._id,
  images: {
    iconUrl60:
      'http://is2.mzstatic.com/image/thumb/Purple69/v4/a4/93/13/a4931300-83e2-154a-a980-7e22e191c7ab/source/60x60bb.jpg',
    iconUrl100:
      'http://is2.mzstatic.com/image/thumb/Purple69/v4/a4/93/13/a4931300-83e2-154a-a980-7e22e191c7ab/source/100x100bb.jpg',
    iconUrl512:
      'http://is2.mzstatic.com/image/thumb/Purple69/v4/a4/93/13/a4931300-83e2-154a-a980-7e22e191c7ab/source/512x512bb.jpg',
    iPhoneScreenshotUrls: [
      'http://is1.mzstatic.com/image/thumb/Purple69/v4/46/bd/a7/46bda74f-8628-7cc9-f168-f182c531de6e/source/406x228bb.jpg',
      'http://is2.mzstatic.com/image/thumb/Purple69/v4/da/54/51/da545182-a91b-ab50-9083-d288a550796a/source/406x228bb.jpg',
      'http://is3.mzstatic.com/image/thumb/Purple69/v4/2d/4e/88/2d4e88e5-1b5f-0d87-43e9-80b6a9d69569/source/406x228bb.jpg',
      'http://is4.mzstatic.com/image/thumb/Purple69/v4/f2/b3/f1/f2b3f173-9318-01da-6e85-91bc3144b551/source/406x228bb.jpg',
      'http://is4.mzstatic.com/image/thumb/Purple69/v4/ae/44/a7/ae44a758-8dff-2dc9-cc89-439e12ca6cbf/source/406x228bb.jpg',
    ],
    iPadScreenshotUrls: [
      'http://is1.mzstatic.com/image/thumb/Purple49/v4/54/9d/60/549d6040-048d-8334-6099-c953e5837c1a/source/552x414bb.jpg',
      'http://is5.mzstatic.com/image/thumb/Purple49/v4/9c/e0/29/9ce02947-2901-1e04-7fa9-885b915a527a/source/552x414bb.jpg',
      'http://is4.mzstatic.com/image/thumb/Purple49/v4/9a/a6/ee/9aa6eea4-92fe-4cd1-161e-6ea3c9569f7e/source/552x414bb.jpg',
      'http://is1.mzstatic.com/image/thumb/Purple69/v4/9d/05/32/9d053237-ef0e-9279-6ce6-6cfd0437b485/source/552x414bb.jpg',
      'http://is3.mzstatic.com/image/thumb/Purple49/v4/1a/4d/90/1a4d9060-0cbf-abaa-f625-b6b2b5552628/source/552x414bb.jpg',
    ],
    appleTvSreenshotUrls: [],
  },
  price: 11.99,
  priceFormatted: '$11.99',
  currency: 'USD',
  fileSizeBytes: '1938644992',
  fileSizeFormatted: '1938644992',
  version: '1.0.5',
  releaseDateCurrentVersion: new Date('2016-01-26T00:47:32Z'),
  releaseDateOriginal: new Date('2015-08-20T07:00:00Z'),
  releaseNotes:
    '・Screen rotate function added. (Please note that the app may quit if the screen is rotated too many times in succession.)\n・The following minigame buttons have been enlarged and/or rearranged:\n Submarine\n G Bike\n Snowboarding\n Shooting Coaster (tap the screen to fire the beam)\n Chocobo Racing\n Fort Condor\n・Name change function added. (Accessible from the world map config menu.)\n・Other minor bugs fixed.',
  description:
    '------------------------------------------------------\n- As this application is very large, it will take some time to download.\n- This application takes up around 2GB of memory. Over 4GB of free space is required to download it, so make sure that ample spare memory is available before attempting to do so. \n------------------------------------------------------\n\nRecommended hardware:\niPhone 5s or later, 3rd generation iPad or later, iPad mini 2 or later, iPod touch 6\n\nSupported OS:\niOS 8.0 or later\n*Please be aware that users may experience problems, such as exceptionally slow running speeds, if running this application on devices other than those outlined in the recommended hardware section.  Such devices are not suited to playing this game and there is a chance of unforeseen errors occurring if running it on them.\n\n\nOutline\n\nThe smash hit RPG: Final Fantasy VII, which has sold over 11,000,000 units* worldwide, finally arrives on iOS!\n*Total includes both packaged sales and downloads.\n\nThe first Final Fantasy to feature 3D backgrounds and CG movie scenes, this dramatic tale continues to be loved by numerous fans around the world. Battle stages also appear in full 3D for the first time, bringing an even greater sense of awe and spectacle to combat!\n\nCustomize your characters in any way you like using the fantastic “material” system that allows endless combinations of spells and abilities.\n\nThis product is a port based on Final Fantasy VII for PC (No changes or additions have been made to the story). \n\n\nStory\n\nWith its unshakeable monopoly over Mako energy production, the evil Shinra Electric Power Company holds tight to the reigns of world power.\nOne day, a Mako reactor serving the sprawling metropolis of Midgar is attacked and destroyed in a bombing raid by a revolutionary group calling themselves Avalanche. \nCloud Strife, a former member of Shinra’s elite “Soldier” unit takes part in the raid as a mercenary hired by Avalanche and sets events in motion that will draw him and his friends into an epic struggle for the fate of the planet itself…\n\n\nSpecial features for the iOS edition \n\n- Play using a simple and comfortable virtual controller designed not to obscure the action, choosing between virtual analogue or fixed 4-way digital control pad options. The opacity of on-screen controls can also be adjusted from the Config Menu.\n\n- Two new features to make play easier and more convenient!\nThe iOS edition also includes an option to turn enemy encounters off on the world and area maps (will not skip event battles) and a Max Stats command to become all-powerful in the blink of an eye.\n\n\nMajor game controls\n\nMovement: Virtual joypad (Select between analogue and digital modes)\nMenu navigation: Fixed digital buttons\nConfirm: A button\nCancel: B button\nOpen menu: Y button',
  rating: {
    current: {
      averageUserRating: 4.0,
      userRatingCount: 308,
    },
    lifetime: {
      averageUserRating: 4.0,
      userRatingCount: 1502,
    },
  },
  bundleId: 'com.square-enix.final-fantasy-vii-ww',
  categories: [category._id],
  kind: 'software',
  minimumOsVersion: '8.0',
  contentRating: '12+',
  contentAdvisoryRating: '12+',
  isGameCenterEnabled: false,
  languageCodesISO2A: ['EN', 'FR', 'DE', 'JA', 'ES'],
  advisories: [
    'Infrequent/Mild Cartoon or Fantasy Violence',
    'Infrequent/Mild Alcohol, Tobacco, or Drug Use or References',
    'Infrequent/Mild Sexual Content and Nudity',
  ],
  supportedDevices: [
    'iPad2Wifi-iPad2Wifi',
    'iPad23G-iPad23G',
    'iPhone4S-iPhone4S',
    'iPadThirdGen-iPadThirdGen',
    'iPadThirdGen4G-iPadThirdGen4G',
    'iPhone5-iPhone5',
    'iPodTouchFifthGen-iPodTouchFifthGen',
    'iPadFourthGen-iPadFourthGen',
    'iPadFourthGen4G-iPadFourthGen4G',
    'iPadMini-iPadMini',
    'iPadMini4G-iPadMini4G',
    'iPhone5c-iPhone5c',
    'iPhone5s-iPhone5s',
    'iPadAir-iPadAir',
    'iPadAirCellular-iPadAirCellular',
    'iPadMiniRetina-iPadMiniRetina',
    'iPadMiniRetinaCellular-iPadMiniRetinaCellular',
    'iPhone6-iPhone6',
    'iPhone6Plus-iPhone6Plus',
    'iPadAir2-iPadAir2',
    'iPadAir2Cellular-iPadAir2Cellular',
    'iPadMini3-iPadMini3',
    'iPadMini3Cellular-iPadMini3Cellular',
    'iPodTouchSixthGen-iPodTouchSixthGen',
    'iPhone6s-iPhone6s',
    'iPhone6sPlus-iPhone6sPlus',
    'iPadMini4-iPadMini4',
    'iPadMini4Cellular-iPadMini4Cellular',
    'iPadPro-iPadPro',
    'iPadProCellular-iPadProCellular',
    'iPadPro97-iPadPro97',
    'iPadPro97Cellular-iPadPro97Cellular',
    'iPhoneSE-iPhoneSE',
    'iPhone7-iPhone7',
    'iPhone7Plus-iPhone7Plus',
    'iPad611-iPad611',
    'iPad612-iPad612',
    'iPad71-iPad71',
    'iPad72-iPad72',
    'iPad73-iPad73',
    'iPad74-iPad74',
    'iPhone8-iPhone8',
    'iPhone8Plus-iPhone8Plus',
    'iPhoneX-iPhoneX',
  ],
  features: ['iosUniversal'],
};

const user = {
  _id: new ObjectID(),
  email: 'drstevebrule@whocares.com',
  password: '4YourHealth',
};

const dropCategories = async () => Category.remove({});

const populateCategory = async () => {
  await Category.remove({});

  return new Category(category).save();
};

const populateDeveloper = async () => {
  await Developer.remove({});

  return new Developer(developer).save();
};

const populateApp = async () => {
  await App.remove({});

  return new App(app).save();
};

const populateUser = async () => {
  await User.remove({});

  return new User(user).save();
};

module.exports = {
  category,
  developer,
  app,
  user,
  dropCategories,
  populateCategory,
  populateDeveloper,
  populateApp,
  populateUser,
};
