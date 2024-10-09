const Organism = require("../models/organism"); 

const getAllOrganisms = async (req, res) => {
    try {
        const allOrganisms = await Organism.find();
        res.render("organisms/index", {
            organisms: allOrganisms, 
            message: "See never before seen specimen of nature"
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const getSpecificOrganism = async (req, res) => {
    try {
        const foundOrganism = await Organism.findById(req.params.id);
        res.render('organisms/speciesDoc', { organism: foundOrganism });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const newDocForm = (req, res) => {
    res.render('organisms/newSpecies');
};

const createNewDoc = async (req, res) => {
    try {
        await Organism.create(req.body);
        res.redirect('/organisms');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const editForm = async (req, res) => {
    try {
        const organismToEdit = await Organism.findById(req.params.id);
        res.render("organisms/editDoc", { organism: organismToEdit });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const editDoc = async (req, res) => {
    try {
        await Organism.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/organisms/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/organisms/${req.params.id}`);
    }
};

const deleteDoc = async (req, res) => {
    try {
        await Organism.findByIdAndDelete(req.params.id);
        res.redirect('/organisms');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const organismImage = async (req, res) => {
    try {
        const foundOrganismBase = await Organism.findById(req.params.id);
        if (!req.body.uploadedBy) { 
            delete req.body.uploadedBy;
        }
        foundOrganismBase.images.push(req.body);
        await foundOrganismBase.save();
        res.redirect(`/organisms/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/organisms/${req.params.id}`);
    }
};

module.exports = {
    getAllOrganisms,
    getSpecificOrganism,
    newDocForm,
    createNewDoc,
    editForm,
    editDoc,
    deleteDoc,
    organismImage
};
