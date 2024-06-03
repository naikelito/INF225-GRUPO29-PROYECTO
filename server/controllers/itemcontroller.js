const Item = require('../models/Item.js');

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createItem = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newItem = new Item({ name, description });
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
