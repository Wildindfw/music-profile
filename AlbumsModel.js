const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  }
});

const AlbumItem = mongoose.model('AlbumItem', AlbumItemSchema);

module.exports = AlbumItem;