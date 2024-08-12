const express = require('express');
const { createServiceCtrl, getServicesCtrl, deleteServiceCtrl, updateServiceCtrl, getOneServicesCtrl } = require('../controllers/serviceController');
const verifyObjectId = require ('../middlweare/verifyObjectId.js');
const { verifyTokenAndAdmin } = require('../middlweare/tokenVerify.js');
const router = express.Router();

// create Service :
router.route('/create').post(verifyTokenAndAdmin, createServiceCtrl);

// get all Service :
router.route('/getAll').get(getServicesCtrl);
// get One Service :
router.route('/getOne/:id').get(getOneServicesCtrl);


// delete one Service :
router.route('/delete/:id').delete(verifyObjectId, verifyTokenAndAdmin, deleteServiceCtrl);

// update one Service :
router.route('/update/:id').put(verifyObjectId, verifyTokenAndAdmin, updateServiceCtrl);

module.exports = router;
