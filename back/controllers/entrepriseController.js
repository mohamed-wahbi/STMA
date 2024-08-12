const asyncHandler = require("express-async-handler");
const { Entreprise, validateEntreprise } = require('../models/EntrepriseModel.js');
const { User } = require('../models/userModel.js')






/*--------------------------------------------------
* @desc    create Entreprise 
* @router  /api/entreprise/create
* @methode POST
* @access  private only user
----------------------------------------------------*/
module.exports.createEntrepriseCtrl = asyncHandler(async (req, res) => {
    // Validation des données
    const { error } = validateEntreprise(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Vérification de l'existence de l'entreprise pour l'utilisateur
    const existingCompany = await Entreprise.findOne({ adminEntreprise: req.user.id });
    if (existingCompany) {
        return res.status(400).json({ message: "L'utilisateur a déjà une entreprise associée." });
    }

    // Création de la nouvelle entreprise
    const newEntreprise = await Entreprise.create({
        adminEntreprise: req.user.id,
        nomEntreprise: req.body.nomEntreprise,
        secteurActivite: req.body.secteurActivite,
        description: req.body.description,
        nomResponsable: req.body.nomResponsable,
        numeroEntreprise: req.body.numeroEntreprise,
        adresseEmail: req.body.adresseEmail,
        nombreEmployes: req.body.nombreEmployes,
        adresseLocale: req.body.adresseLocale,
        achevement: req.body.achevement,
        specialites: req.body.specialites
    });

    // Mise à jour de l'utilisateur pour indiquer qu'il a une entreprise
    const findUser = await User.findById(req.user.id);
    if (!findUser) {
        return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    await User.findByIdAndUpdate(req.user.id, {
        $set: { haveCampany: true }
    }, {
        runValidators: true,
        new: true
    });

    // Réponse à l'utilisateur
    res.status(200).json({ message: "Entreprise créée avec succès.", userId: req.user.id });
});


















/*--------------------------------------------------
* @desc    get user entreprise
* @router  /api/entreprise/getUserCompany
* @methode GET
* @access  private only user
----------------------------------------------------*/
module.exports.getUserCompany = asyncHandler(async (req, res) => {

    const userCompany = await Entreprise.findOne({ adminEntreprise: req.user.id });

    if (!userCompany) {
        return res.status(400).json({ message: "L'utilisateur n'a pas encore d'entreprise associée." });
    }

    // Formater les dates dans les réalisations de l'entreprise
    const formattedAchevement = userCompany.achevement.map(item => ({
        ...item,
        dateTravail: item.dateTravail.toLocaleDateString("fr-FR") // Formater la date au format "jj/mm/aaaa"
    }));


    res.status(200).json({
        userCompany
    })
})









/*--------------------------------------------------
* @desc    deconnecte entreprise
* @router  /api/entreprise/deconnect
* @methode PUT
* @access  private only user
----------------------------------------------------*/
module.exports.deconnecterEntrepriseCtrl = asyncHandler(async (req, res) => {

    const adminId = req.user.id

    const getUserEntreprise = await Entreprise.findOne({ adminEntreprise: adminId })
    if (!getUserEntreprise) {
        res.json({ message: "cette utilisateur na pas d'entreprise !" })
    }

    const getUserEntrepriseAndUpdate = await Entreprise.findOneAndUpdate({ adminEntreprise: adminId }, {
        $set: {
            isConnected: false
        }
    })
    
    res.status(200).json({ message: "entreprise déconnecter !" })
})





/*--------------------------------------------------
* @desc    get all entreprise
* @router  /api/entreprise/getAll
* @methode get
* @access  private only admin
----------------------------------------------------*/
module.exports.getAllEntrepriseCrtl = asyncHandler (async(req,res)=>{

    const getAllEntreprises = await Entreprise.find({});

    if (!getAllEntreprises){
        return res.status(400).json({message:"not Company in the data base !"})
    }

    const getConnectedEntreprise = await Entreprise.find({isConnected:true})
    const numberConnectedEntreprise = getConnectedEntreprise.length



    const getNotConnectedEntreprise = await Entreprise.find({isConnected:false})
    const numberNotConnectedEntreprise = getNotConnectedEntreprise.length


    res.status(200).json({
        message:"voila les entreprise ...",
        numberConnectedEntreprise,
        getConnectedEntreprise,
        numberNotConnectedEntreprise,
        getNotConnectedEntreprise

    })
})







/*--------------------------------------------------
* @desc    get entreprise by secteur
* @router  /api/entreprise/getEntreprisesBySecteur
* @methode get
* @access  public
----------------------------------------------------*/
module.exports.getEntrepriseBySecteurCtrl = asyncHandler (async(req,res)=>{

    const secteur = req.params.secteur;

    const entreprisesBYSecteur = await Entreprise.find({secteurActivite:secteur})

    if(entreprisesBYSecteur.length===0){
        return res.status(400).json({
            message :"pas dentreprise avec cette specialitée !"
        })
    }

    res.status(200).json({
        EntreprisesBySecteur:entreprisesBYSecteur
    })
})








/*--------------------------------------------------
* @desc    Creat rate user 
* @router  /api/entreprise/addRat
* @methode post
* @access  only user
----------------------------------------------------*/
module.exports.addRatCtrl = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    // Trouver l'entreprise
    const findEntreprise = await Entreprise.findById(req.params.id);

    if (!findEntreprise) {
        return res.status(404).json({ message: "Entreprise not found!" });
    }

    // Ajouter la nouvelle notation utilisateur
    findEntreprise.userRatting.push({
        RatNumber: req.body.RatNumber,
        userRat: userId
    });

    // Calculer la notation publique en trouvant la notation la plus fréquente
    const ratingCounts = findEntreprise.userRatting.reduce((counts, rating) => {
        counts[rating.RatNumber] = (counts[rating.RatNumber] || 0) + 1;
        return counts;
    }, {});

    const mostFrequentRating = Object.keys(ratingCounts).reduce((a, b) => ratingCounts[a] > ratingCounts[b] ? a : b);

    findEntreprise.publicRatting = parseInt(mostFrequentRating, 10);

    // Sauvegarder les changements
    await findEntreprise.save();

    res.status(200).json({
        message: "User rated successfully!",
        findEntreprise
    });
});



/*--------------------------------------------------
* @desc    get user ratting 
* @router  /api/entreprise/getRatting
* @methode get
* @access  public
----------------------------------------------------*/
module.exports.getRatCtrl = asyncHandler (async(req,res)=>{


    res.status(200).json({

    })
})