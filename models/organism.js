const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({ 
    imageUrl: { type: String, require: true},
    uploadedBy: { type: String, default: "Guest" }
})

const organismSchema = new mongoose.Schema ({
    catergory: {
        type: String, 
        enum: ["plants", "animals", "fungi", "algae", "bacteria", "protozoa", "archaens"]
    }, 
    name: String,
    domain: String,
    kingdom: String,
    phylum: String,
    class: String,
    order: String,
    family: String,
    genus: String,
    species: String,
    appearance: String,
    behaviors: String,
    habitat: String,
    location: String,
    evironmentalNiche: String,
    images: [imageSchema]
})

const Organism = mongoose.model("Organism", organismSchema)

module.exports = Organism;