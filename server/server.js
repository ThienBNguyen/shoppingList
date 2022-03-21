const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');
require('dotenv').config;
const app = express();
//bodyparser middleware
app.use(bodyParser.json());

const uri =
	'mongodb+srv://mongoconnect:Tn123456789@yelpcamp.7z2ix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('mongoDB Connected...')).catch;

//Use Routes
app.use('/api/items', items);
//server static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client, build', 'index.html'));
	});
}
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`server started on port ${port}`));
