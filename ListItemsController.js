const ListItem = require('./ListItemModel.js');
const mongoose = require('mongoose');

const ListController = {
    addItem(req, res) {
        ListItem.create(req.body, (err, result) => {
            if (err) { return res.sendStatus(418) }
            else {
                res.json(result);
            }
        });
    },

    getExistingList(req, res) {
        ListItem.find({}, (err, result) => {
            if (result === null) { return res.sendStatus(418) };
          return res.send(result);
        })
    },

    deleteItem(req, res) {
        const description = req.body.description;
        ListItem.findOneAndRemove({description}, (err, result) => {
            if (err) { return res.sendStatus(418) }
            return res.sendStatus(200);
        });
    }
}

module.exports = ListController;