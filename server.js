const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const listItemsController = require('./ListItemsController.js')

app.use(express.static('build'));

mongoose.connect('mongodb://paul:codesmith@ds139960.mlab.com:39960/music-profile');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route for login

app.get('/allSets', listItemsController.getExistingSetlist);
app.get('/playLists', listItemsController.getExistingPlaylist);

app.post('/add', listItemsController.addItem);

app.delete('/', listItemsController.deleteItem);

app.listen(3000, () => console.log('Listening on port 3000'));