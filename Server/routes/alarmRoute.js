const express = require ('express');
const router = express.Router();
const {createAlarmCtrl, getAllAlarmCtrl, deleteOneAlert} = require ('../controllers/alarmControlller')

// creat alarm : 
router.route('/create').post(createAlarmCtrl)

//get all alarm : 
 router.route('/getAll').get(getAllAlarmCtrl)

//delete one alarm by id 
router.route('/deleteOne/:id').delete(deleteOneAlert)
module.exports = router