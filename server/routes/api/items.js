const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// Item Model
const Item = require('../../models/Item');

// @route get api/items
// @desc Get All Items
// @access Pulbic
router.get('/', (req, res) => {
	Item.find().sort({ date: -1 }).then((items) => res.json(items));
});

router.post('/', auth, (req, res) => {
	console.log(req.body);
	// get the object from the bodyparser
	const newItem = new Item({
		name: req.body.name
	});
	newItem.save().then((item) => res.json(item));
	//res.json() give 200 response
});
router.delete('/:id', auth, (req, res) => {
	// get the object from the bodyparser
	Item.findById(req.params.id)
		.then((item) => item.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
