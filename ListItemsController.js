const ListItem = require('./ListItemModel.js');
const PlaylistItem = require('./PlaylistModel.js');
const AlbumItem = require('./AlbumsModel.js');
const mongoose = require('mongoose');

const ListController = {
    addItem(req, res) {
        if (req.body.name) {
            PlaylistItem.create(req.body, (err, result) => {
                if (err) { return res.sendStatus(418) }
                else {
                    res.json(result);
                }
            });
        } else if (req.body.description) {
            ListItem.create(req.body, (err, result) => {
                if (err) { return res.sendStatus(418) }
                else {
                    res.json(result);
                }
            });
        } else if (req.body.title) {
            AlbumItem.create(req.body, (err, result) => {
                if (err) { return res.sendStatus(418) }
                else {
                    res.json(result);
                }
            });
        }
    },

    getExistingSetlist(req, res) {
        ListItem.find({}, (err, result) => {
            if (result === null) { return res.sendStatus(418) };
            return res.send(result);
        });
    },

    getExistingPlaylist(req, res) {
        PlaylistItem.find({}, (err, result) => {
            if (result === null) { return res.sendStatus(418) };
            return res.send(result);
        });
    },
    getExistingAlbums(req, res) {
        AlbumItem.find({}, (err, result) => {
            if (result === null) { return res.sendStatus(418) };
            return res.send(result);
        });
    },

    deleteItem(req, res) {
        if (req.body.name) {
            const name = req.body.name;

            PlaylistItem.findOneAndRemove({ name }, (err, result) => {
                if (err) { return res.sendStatus(418) }
                return res.sendStatus(200);
            });
        } else if (req.body.description) {
            const description = req.body.description;

            ListItem.findOneAndRemove({ description }, (err, result) => {
                if (err) { return res.sendStatus(418) }
                return res.sendStatus(200);
            });
        } else if (req.body.title) {
            const title= req.body.description;

            ListItem.findOneAndRemove({ title}, (err, result) => {
                if (err) { return res.sendStatus(418) }
                return res.sendStatus(200);
            });
        }
    }
}

module.exports = ListController;