const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListItemSchema = new Schema ({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const listItem = mongoose.model('listItem', ListItemSchema);

module.exports = listItem;