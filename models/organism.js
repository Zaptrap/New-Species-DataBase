const mongoose = require("mongoose");

const organismSchema = new mongoose.Schema ({
    catergory: {
        type: String, 
        enum: ["plants", "animals", "fungi", "algae", "bacteria", "protozoa", "archaens"]
    }, 
    name: String,
    domain: String,
    kingdomingdom: String,
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
    evironmentalNiche: String
})

const imageSchema = new mongoose.Schema({ 
    imageUrl: { type: String, require: true},
    uploadedBy: { type: String, default: "Guest" }
})

const publicationSchema = new mongoose.Schema({
    newSpecies: {
        type: String,
        required: true     
    },
    author: {
        type: String,
        required: true   
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    } 
}, 
{
    timestamps: true
});


const Organism = mongoose.model("Organism", organismSchema)

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = (
    Organism,
    Publication
)