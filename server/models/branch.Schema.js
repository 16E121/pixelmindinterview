const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    unique: true
  }
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
