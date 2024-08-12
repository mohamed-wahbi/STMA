const express = require('express');
const { createAvieCtrl, getAvieCtrl, deleteAvieCtrl, getCheckedAvieCtrl, isCheckedCtrl, createAvieImageCtrl, imagesUploading } = require('../controllers/avieController');
const { verifyTokenAndOnlyUser, verifyTokenAndAdmin } = require('../middlweare/tokenVerify');
const router = express.Router();
const verifyObjectId = require ('../middlweare/verifyObjectId.js');
const uploadFile = require('../middlweare/photoUpload.js');


//Create Avie :
router.route('/create').post(verifyTokenAndOnlyUser,createAvieCtrl);

// Get all Avies : 
router.route('/getAllAvies').get(verifyTokenAndAdmin,getAvieCtrl)

// Get checked Avies : 
router.route('/getCheckedAvies').get(verifyTokenAndOnlyUser,getCheckedAvieCtrl)

// delete one avie : 
router.route('/deleteAvie/:id').delete(verifyObjectId,verifyTokenAndAdmin,deleteAvieCtrl)


// update isChecked avie true : 
router.route('/updateIschecked/:id').put(verifyObjectId,verifyTokenAndAdmin,isCheckedCtrl)

// create avie image :
router.route('/create/image').post(verifyTokenAndOnlyUser,uploadFile.single("photo"),createAvieImageCtrl)

// apload many images :
router.route('/images')
.post(uploadFile.array('photos',5),imagesUploading)



module.exports = router;