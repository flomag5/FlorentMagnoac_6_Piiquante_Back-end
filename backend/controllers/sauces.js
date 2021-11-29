// Importation du modèle de la database
const Sauce = require('../models/Sauce');


// Création d'une sauce CREATE
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Enregistrement d'une sauce dans database
    sauce.save()
        .then(() => {
            res.status(201).json({
                message: "Sauce bien enregistrée !",
                contenu: req.body
            })
        })
        .catch((error) => res.status(400).json({ error }))

};

// Affichage de toutes les sauces READ
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Affichage d'une sauce READ
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Modification d'une sauce UPDATE
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            // Construction de l'URL du fichier enregistré
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "La sauce a été modifiée" }))
        .catch(error => res.status(400).json({ error }));
};

// Suppression d'une sauce DELETE
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "La sauce a bien été supprimée" }))
        .catch(error => res.status(400).json({ error }));
};