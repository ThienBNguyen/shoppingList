const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require('./routes/api/items')
require('dotenv').config
const app = express();
//bodyparser middleware
app.use(bodyParser.json())

const uri = "mongodb+srv://mongoconnect:Tn123456789@yelpcamp.7z2ix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => console.log('mongoDB Connected...')).catch

//Use Routes
app.use('/api/items', items)

const port = process.env.PORT || 6000
app.listen(port, () => console.log(`server started on port ${port}`))