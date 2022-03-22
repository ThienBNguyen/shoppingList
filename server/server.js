const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const config = require('config');
const path = require('path');
require('dotenv').config;
const app = express();
//bodyparser middleware
app.use(express.json());
const db = config.get('mongoURI');
const uri =
	'mongodb+srv://mongoconnect:Tn123456789@yelpcamp.7z2ix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('mongoDB Connected...')).catch;

//Use Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client, build', 'index.html'));
	});
}
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`server started on port ${port}`));
