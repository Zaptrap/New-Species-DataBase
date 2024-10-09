const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const organismControllers = require("./controllers/organismCtrl")



// middle-ware
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const Organism = require('./models/organism');
const organism = require("./models/organism");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

// mongoose connection event listeners
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

// landing page
app.get('/', (req,res) => {
    res.render('homepage')
}) 

// index
app.get('/organisms', organismControllers.getAllOrganisms)

// creating new doc
app.post('/organisms', organismControllers.createNewDoc)

// create form 
app.get('/organisms/new', organismControllers.newDocForm)

// show individual pages/docs
app.get('/organisms/:id', organismControllers.getSpecificOrganism)

// edit form 
app.get('/organisms/:id/edit', organismControllers.editForm)

// pushing edits
app.put('/organisms/:id', organismControllers.editDoc)

// delete
app.delete('/organisms/:id', organismControllers.deleteDoc)

// image
app.post('/organisms/:id/images', organismControllers.organismImage)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 