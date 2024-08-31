const express=require('express')
const router=express.Router()

const{ deleteBranch,updateBranch,getBranchById,getAllBranches,createBranch}=require('../controllers/branchController')


router.post('/api/branch',createBranch);
router.get('/api/getallbranch',getAllBranches);
router.get('/api/getbranch/:id',getBranchById);
router.put('/api/updatebranch/:id',updateBranch);
router.delete('/api/deletebranch/:id',deleteBranch);



module.exports=router