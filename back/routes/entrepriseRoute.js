const express = require('express');
const { verifyTokenAndOnlyUser, verifyTokenAndAdmin, verifyToken } = require('../middlweare/tokenVerify');
const verifyObjectId = require('../middlweare/verifyObjectId');
const { createEntrepriseCtrl, getUserCompany, deconnecterEntrepriseCtrl, getAllEntrepriseCrtl, getEntrepriseBySecteurCtrl, addRatCtrl } = require('../controllers/entrepriseController');
const router = express.Router();

// create entreprise route :
router.route('/create').post(verifyTokenAndOnlyUser,createEntrepriseCtrl)

// get entreprise d'un user route :
router.route('/getUserCompany').get(verifyTokenAndOnlyUser,getUserCompany)

// deconnecter entreprise route :
router.route('/deconnect').put(verifyTokenAndOnlyUser,deconnecterEntrepriseCtrl)

// get all entreprise route :
router.route('/getAllCompany').get(verifyTokenAndAdmin,getAllEntrepriseCrtl)

// get entreprises by secteur :
router.route('/getEntreprisesBySecteur/:secteur').get(getEntrepriseBySecteurCtrl)





// add rate user :
router.route('/addRat/:id').post(verifyObjectId,verifyTokenAndOnlyUser,addRatCtrl)




module.exports = router ;