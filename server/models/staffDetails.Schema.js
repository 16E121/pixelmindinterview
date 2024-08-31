const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String },
  staffType: { type: String },
  defaultBranch: { 
    type: String,
    enum: ['India', 'America', 'France'], 
    required: true
  },
  accessBranch: [{ 
    type: String, 
    enum: ['India', 'America', 'France'] 
  }],
  joiningDate: { type: Date },
  dateOfBirth: { type: Date },
  age: { type: Number },
  month: { type: String },
  gender: { type: String },
  mobileNumber: { type: String },
  personalID: { type: String },
  nationality: { type: String },
  emergencyNumber: { type: String },
  notes: { type: String },
  imageUpload: { type: String }
});

const StaffDetails = mongoose.model('StaffDetails', staffSchema);
module.exports = StaffDetails;




