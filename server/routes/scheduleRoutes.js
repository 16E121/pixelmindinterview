const express=require('express')
const router=express.Router()

const{  createSchedule,
    listAllSchedules,
    showSchedule,
    updateSchedule,
    deleteSchedule}=require('../controllers/scheduleController')


router.post('/api/create',createSchedule);
router.get('/api/getalldetails',listAllSchedules);
router.get('/api/getdetails/:id',showSchedule);
router.put('/api/schedule/:id',updateSchedule);
router.delete('/api/schedule/:id',deleteSchedule);



module.exports=router