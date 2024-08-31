const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  fromTime: {
    type: Date,
    required: true
  },
  toTime: {
    type: Date,
    required: true
  }
});

const scheduleSchema = new Schema({
  serviceCategory: {
    type: String,
    enum: ['Category1', 'Category2', 'Category3'],
    required: true
  },
  serviceName: {
    type: String,
    enum: ['Service1', 'Service2', 'Service3'],
    required: true
  },
  dateRange: {
    type: String,
    enum: ['ongoing', 'custom'],
    required: true
  },
  customDetails: {
    type: String,
    default: null
  },
  fromDate: {
    type: Date,
    default: null
  },
  toDate: {
    type: Date,
    default: null
  },
  sameAsEveryday: {
    type: Boolean,
    default: true
  },
  timeSlots: [timeSlotSchema],
  monday: {
    type: Date,
    default: null
  },
  tuesday: {
    type: Date,
    default: null
  },
  wednesday: {
    type: Date,
    default: null
  },
  thursday: {
    type: Date,
    default: null
  },
  friday: {
    type: Date,
    default: null
  },
  saturday: {
    type: Date,
    default: null
  },
  sunday: {
    type: Date,
    default: null
  }
});

scheduleSchema.pre('validate', function(next) {
  if (!this.sameAsEveryday) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const allday = days.some(day => this[day] !== null);
    if (!allday) {
      return next(new Error('At least one day-specific date must be provided when sameAsEveryday is false.'));
    }
  }
  next();
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;


