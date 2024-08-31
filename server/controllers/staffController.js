const StaffDetails = require('../models/staffDetails.Schema');
const path = require('path');

const mongoose=require('mongoose');
const fs = require('fs');
const upload=require('../middleware/upload')

const listAllStaff = async (req, res) => {
  try {
    /*  #swagger.tags = ['Staff'] 
        #swagger.description = 'Endpoint to list all staff'  
    */
    const staff = await StaffDetails.find();
    return res.status(200).json(staff);
  } catch (err) {
    return res.status(500).json({ error: err.message, status: 0 });
  }
};


const createstaff = async (req, res) => {

  /*  #swagger.tags = ['Staff'] 
    #swagger.description = 'Image upload error using this swagger instead this use Postman'
*/

/*
    #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['image'] = {
        in: 'formData',
        type: 'file',
        description: 'image'
    }
 /*        #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['data'] = {
        in: 'formData',
        type: 'String'
        }
*/




  try {
      const file = req.file;
      let dataValues = req.body.data;

      console.log('Raw request body:', req.body);
      console.log('Raw file:', file);

      if (!dataValues) {
          return res.status(400).json({ error: 'Staff data is required', status: 0 });
      }

      if (typeof dataValues === 'string') {
          try {
              dataValues = JSON.parse(dataValues);
          } catch (parseError) {
              return res.status(400).json({ error: 'Invalid data format', status: 0 });
          }
      }

      if (typeof dataValues !== 'object' || Array.isArray(dataValues)) {
          return res.status(400).json({ error: 'Invalid staff data format', status: 0 });
      }

      if (!dataValues.firstName || !dataValues.lastName || !dataValues.email || !dataValues.defaultBranch) {
          return res.status(400).json({ error: 'All required fields (firstName, lastName, email, defaultBranch) must be provided', status: 0 });
      }

      const imageUpload = file ? path.join('uploads', file.filename) : null;

      console.log(`path: ${imageUpload}`);
      console.log('values:', dataValues);
      const staff = new StaffDetails({...dataValues,imageUpload    
      });

      await staff.save();
      res.status(201).json({ message: 'Staff added successfully', status: 1 });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message, status: 0 });
  }
};


const showStaff = async (req, res) => {
  try {
    /*  #swagger.tags = ['Staff'] 
        #swagger.description = 'Retrieve staff details by ID'  
    */
    const staff = await StaffDetails.findById(req.params.id);
    if (!staff) return res.status(404).json({ error: 'Staff not found', status: 0 });
   return res.status(200).json(staff);
  } catch (err) {
   return  res.status(500).json({ error: err.message, status: 0 });
  }
};


const updatedetails = async (req, res) => {
    /*  #swagger.tags = ['Staff'] 
    #swagger.description = 'Image upload error using this swagger instead this use Postman'
*/
 /*
    #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['image'] = {
        in: 'formData',
        type: 'file',
        required: true,
        description: 'image'
    }
 /*        #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['data'] = {
        in: 'formData',
        type: 'String'
        }
*/


  try {
      const file = req.file;
      const dataValues = req.body;
      const id = req.params.id;

      console.log('body:', req.body);
      console.log('file:', file);

      if (!id) {
          return res.status(400).json({ error: 'Staff ID is required', status: 0 });
      }

      if (!dataValues && !file) {
          return res.status(400).json({ error: 'No data or file provided', status: 0 });
      }
const staff = await StaffDetails.findById(id);
      if (!staff) {
          return res.status(404).json({ error: 'Staff record not found', status: 0 });
      }

      if (file) {
          if (staff.imageUpload) {
              const existingImagePath = path.join(__dirname, staff.imageUpload);
              fs.unlink(existingImagePath, (err) => {
                  if (err) {
                      console.error('Error removing existing image:', err);
                  }
              });
          }

  staff.imageUpload = path.join('uploads', file.filename);
      }

      if (Object.keys(dataValues).length > 0) {
          staff.set(dataValues);
      }

      console.log(`Updated image path: ${staff.imageUpload}`);
      console.log('Updated data values:', staff);

      await staff.save();
      res.status(200).json({ message: 'Staff updated successfully', status: 1 });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message, status: 0 });
  }
};


const deletedetails = async (req, res) => {
  try {
    /*  #swagger.tags = ['Staff'] 
        #swagger.description = 'Delete staff details by ID'  
    */
    const result = await StaffDetails.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Staff not found', status: 0 });
    }
    res.status(200).json({ message: 'Staff deleted successfully', status: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 0 });
  }
};


module.exports = { listAllStaff,createstaff,showStaff,updatedetails,deletedetails};