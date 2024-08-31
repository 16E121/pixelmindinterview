const mongoose = require('mongoose');
const Branch = require('../models/branch.Schema'); 
const StaffDetails=require('../models/staffDetails.Schema')


const createBranch = async (req, res) => {
    /*  #swagger.tags = ['Branch'] 
        #swagger.description = 'Endpoint Create ScheduleList'  
        */
        try {
          const {name} = req.body;
          await Branch.create({name:name})
        await Branch.save();
 return res.status(200).json({message:'Branch Added successfully',status:1});
        } catch (err) {
          return res.status(200).json({message:err,status:0})
        }
};

const getAllBranches = async (req, res) => {
     /*  #swagger.tags = ['Branch'] 
        #swagger.description = 'Endpoint AllSchedule'  
        */
        try {
          const branches = await Branch.find();
         
    return res.status(200).json({branches});
        } catch (err) {
        console.error('Error fetching branches:', err);
        }
};

const getBranchById = async (req, res) => {
   /*  #swagger.tags = ['Branch'] 
        #swagger.description = 'Endpoint branch using ID'  
        */
        try {
            const branch = await Branch.findById(req.params.id);
           console.log('Branch', branch);
           return branch;
        } catch (err) {
          return res.status(500).json({message:err,status:0})
         
        }
};


const updateBranch = async (req, res) => {
   /*  #swagger.tags = ['Branch'] 
        #swagger.description = 'Endpoint brach update list'  
        */
        try {
          const name=req.body.name;
            const updatedBranch = await Branch.findByIdAndUpdate(
            req.params.id, 
            { name: name },
             { new: true, runValidators: true } );
      
          if (!updatedBranch) {
            return res.status(400).json({ message:'Branch not found',status:0})
          }
      
          await StaffDetails.updateMany(
            { defaultBranch: req.params.id },{ $set: { name: name } });
      
          await StaffDetails.updateMany(
            { accessBranch: req.params.id },{ $set: { "accessBranch.$[elem].name": name } },
{ arrayFilters: [{ "elem": req.params.id }] }
          );
          return res.status(200).json({message:'Branch details update successfully',status:1})
        } catch (err) {
          return res.status(500).json({message:err,status:0})
        }
};

const deleteBranch = async (req, res) => {
   /*  #swagger.tags = ['Branch'] 
        #swagger.description = 'Endpoint schedule delete using ID'  
 */
        try {
      await Branch.findByIdAndDelete(req.params.id);
  
      await StaffDetails.updateMany(
        { defaultBranch: req.params.id },
        { $unset: { defaultBranch: "" } }
      );
 await StaffDetails.updateMany( { accessBranch: req.params.id },
        { $pull: { accessBranch: req.aprams.id } }
      );
  
      return res.status(200).json({message:'Branch Details Deleted Successfully',status:1})
    } catch (err) {
      console.error('Error deleting branch:', err);
    }
};



const updateMultipleBranch = async (req, res) => {
   /*  #swagger.tags = ['Branch'] 
        #swagger.description = 'Endpoint branch'  
        */
  try {
    const {name} = req.body;
    if (!serviceCategory || !updateData || typeof updateData !== 'object' || Array.isArray(updateData)) {
      return res.status(400).json({ error: 'Service category and update data are required and update data must be an object' });
    }
else{
    const result = await Branch.updateMany({ name }, { $set: name });
    res.status(200).json({message:'Branch Data updated successfully',status:1 });
}  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





module.exports={deleteBranch,updateBranch,getBranchById,getAllBranches,createBranch,updateMultipleBranch}