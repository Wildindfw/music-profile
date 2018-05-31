const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistItemSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const playListItem = mongoose.model('playlistItem', PlaylistItemSchema);

module.exports = playListItem;