function fileSizeFormatted(bytes) {
  // returns a String
  // if under a GB, is size in MB followed by ' MB'
  // if over a GB, is size in GB (1 decimal place float) followed by ' GB'
  // TODO:
}

const AppSchema = {
  id: String, // trackId
  name: String, // trackName
  nameCensored: String, // trackCensoredName
  url: String, // trackViewUrl
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'developer',
  },
  images: {
    type: Schema.Types.ObjectId,
    ref: 'image',
  },
  price: Number, // price
  priceFormatted: String, // formattedPrice
  currency: String, // currency
  fileSizeBytes: Number, // fileSizeBytes
  fileSizeFormatted: { // fileSizeBytes (gets fed to this)
    type: String,
    set: fileSizeFormatted,
  },

};

const DeveloperSchema = {
  id: String, // artistId
  name: String, // artistName
  nameFull: String, // sellerName
  urlApple: String, // artistViewUrl
  urlDeveloper: String, // sellerUrl
};

const CategorySchema = {

};

const ImageSchema = {
  iconUrl60: String, // artworkUrl60
  iconUrl100: String, // artworkUrl100
  iconUrl512: String, // artworkUrl512
  iPhoneScreenshotUrls: Array, // screenshotUrls
  iPadScreenshotUrls: Array, // ipadScreenshotUrls
  appleTvSreenshotUrls: Array, // appletvScreenshotUrls
};
