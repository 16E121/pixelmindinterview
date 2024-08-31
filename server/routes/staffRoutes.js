
const express = require('express');
const router = express.Router();
const upload=require('../middleware/upload')

const {listAllStaff,createstaff,showStaff,updatedetails,deletedetails} = require('../controllers/staffController');



router.get('/api/staff', listAllStaff);
router.post('/api/staff',upload.single('image'), createstaff);
router.get('/api/staff/:id', showStaff);
router.put('/api/staff/:id',upload.single('image'), updatedetails);
router.delete('/api/staff/:id', deletedetails);

module.exports = router;
