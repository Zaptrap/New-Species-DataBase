const organism = require("../models/organism")

const getAllOrganisms = async (req, res) => {
    try {
    const allOrganisms = await organism.find()
    res.render("organisms/index", {organisms: allOrganisms, message: "See never before seen speciemen of nature"})
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
}

const getSpecificOrganism = async (req, res) => {
    try {
        const foundOrganism = await Organism.findById(req.params.id)
        const dataAspect = {organism: foundOrganism};
        res.render('organisms/speciemenDoc')
    } catch(err) {
        console.log(err);
        res.redirect("/");
    }
}

const newDocForm = (req,res) => {
    res.render('organisms/newSpecies')
}

const createNewDoc = async (req,res) => {
    try {
        await Organism.create(req.body)
        res.redirect('/organisms')
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

const editForm = async (req,res) => {
    try {
        const organismToEdit = await Organism.findById(req.param.id)
        res.render("organisms/edit", {organism: organismToEdit})
    } catch(err) {
        console.log(err);
        res.redirect(`/`);
    }
}

const editDoc = async (req, res) => {
    try {
        await Organism.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect(`/organisms/${req.params.id}`)
    } catch(err) {
        console.log(err)
        res.redirect(`/organisms/${req.params.id}`)
    }
}

const deleteDoc = async (req, res) => {
    try {
        await Organism.findByIdAndDelete(req.params.id)
        res.redirect('/organisms')
    } catch(err) {
        console.log(err);
        res.redirect(`/`);
    }
}

const organismImage = async (req, res) => {
    try {
        const foundOrganismBase = await Organism.findById(req.params.id)
        if (req.body.uploadedBy === "") {
            delete req.body.uploadedBy;
            console.log("after parsing", req.body);
        }
        foundOrganismBase.images.push(req.body)
        await foundOrganismBase.save()
        res.redirect(`/organisms/${req.params.id}`)
    } catch(err) {
        console.log(err)
        res.redirect(`/organisms/${req.params.id}`)
    }
}

const publisher = async (req, res) => {
    try {
        const organismPinpoint = await Organism.findById(req.params.id)
        organismPinpoint.publish.push(req.body)
        await organismPinpoint.save()
        res.redirect(`/organisms/${req.params.id}`)
    } catch(err) {
        console.log(err);
        res.redirect(`/fruits/${req.params.fruitId}`);
    }
}

module.exports = {
    getAllOrganisms,
    getSpecificOrganism,
    newDocForm,
    createNewDoc,
    editForm,
    editDoc,
    deleteDoc,
    organismImage, 
    publisher
}