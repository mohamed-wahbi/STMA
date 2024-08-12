const express = require('express');
const { newUserServiceCtrl, getUserWithServiceCtrl, getOneUserWithServiceCtrl, deleteUserServiceCtrl, uploadImgsCtrl, getServiceByIdCtrl, confirmServiceCntr, getAllConfServiceCtrl, GetConfirmedServiceByIdCtrl, GetConfirmedServicesByIdClientCtrl } = require('../controllers/userServiceCtrl');
const { verifyTokenAndOnlyUser, verifyToken, verifyTokenAndAdmin, verifyTokenAndAdminORTechnicien } = require('../middlweare/tokenVerify');
const verifyObjectId = require ('../middlweare/verifyObjectId.js');
const router = express.Router();
const uploadFile = require('../middlweare/photoUpload.js');





//user servise add :
router.route("/service/create").post(verifyTokenAndOnlyUser,uploadFile.array('images'),newUserServiceCtrl)

// get user avec services :
router.route("/service/getAll").get(verifyToken,getUserWithServiceCtrl)

// get user avec services :
router.route("/service/getOne/:id").get(verifyObjectId,verifyToken,getOneUserWithServiceCtrl)

// get one service by id :
router.route("/service/getServiceById/:id/:serviceId").get(getServiceByIdCtrl)

// Delete user services :
router.route('/service/delete/:userId/:serviceId/:besoinId?')
.delete(verifyToken,deleteUserServiceCtrl)


//confirme service by id : 
router.route('/service/update/:userId/:serviceId').put(verifyTokenAndAdmin,confirmServiceCntr)

//get all Confirmed service :
router.route('/service/getAllConfirmedService').get(verifyTokenAndAdminORTechnicien,getAllConfServiceCtrl)

//get one Confirmed service by id:
router.route('/service/getConfirmedServiceById/:id').get(verifyObjectId,GetConfirmedServicesByIdClientCtrl)


module.exports = router;