const Schedule = require('../models/schedule.Schema');

const createSchedule = async (req, res) => {
    /*  #swagger.tags = ['Schedule'] 
        #swagger.description = 'Endpoint to create a new schedule.'  
    */
    /*  #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['data'] = {
          in: 'formData',
          type: 'String'
      }
    */
    try {
        const {
            serviceCategory,serviceName,dateRange,customDetails,fromDate,
     toDate, sameAsEveryday,timeSlots,monday,tuesday,wednesday,thursday,friday,saturday,sunday
        } = req.body;

        if (!serviceCategory || !serviceName || !dateRange || !timeSlots) {
     return res.status(400).json({ error: 'Missing required fields' });
        }

        const allowedServiceNames = ['Office Cleaning', 'Home Cleaning', 'Window Washing']; 
      if (!allowedServiceNames.includes(serviceName)) {
     return res.status(400).json({ error: 'Invalid serviceName' });
        }

    
        let parsedTimeSlots = [];
        if (typeof timeSlots === 'string') {
            try {
                parsedTimeSlots = JSON.parse(timeSlots);
            } catch (err) {
         return res.status(400).json({ error: 'Invalid timeSlots JSON' });
            }
        } else if (Array.isArray(timeSlots)) {
            parsedTimeSlots = timeSlots;
        } else {
           return res.status(400).json({ error: 'Invalid timeSlots format' });
        }

      
        for (const slot of parsedTimeSlots) {
            if (!slot.branch || !slot.fromTime || !slot.toTime) {
          return res.status(400).json({ error: 'Time slots missing',status:0 });
            }
        }

        const parseDate = (dateStr) => {
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? null : date;
        };

        const schedule = new Schedule({
            serviceCategory,
         serviceName, dateRange,
         customDetails, fromDate: fromDate ? parseDate(fromDate) : null,
            toDate: toDate ? parseDate(toDate) : null,sameAsEveryday: sameAsEveryday === 'true',
         timeSlots: parsedTimeSlots,
            monday: parseDate(monday),
            tuesday: parseDate(tuesday),
            wednesday: parseDate(wednesday),
            thursday: parseDate(thursday),
            friday: parseDate(friday),
            saturday: parseDate(saturday),
            sunday: parseDate(sunday)
        });

        await schedule.save();

        res.status(200).json({ message: 'Schedule created successfully', status: 1 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Schedule erro',status:0 });
    }
};



const listAllSchedules = async (req, res) => {
    /*  #swagger.tags = ['Schedule'] 
        #swagger.description = 'Endpoint to list all schedules.'  
    */
    try {
        const schedules = await Schedule.find();
    return res.status(200).json(schedules);
    } catch (err) {
      return  res.status(500).json({ error: err.message,status:0 });
    }
};



const showSchedule = async (req, res) => {
    /*  #swagger.tags = ['Schedule'] 
        #swagger.description = 'Endpoint to get a schedule by ID.'  
    */
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) return res.status(404).json({ error: 'Schedule not found',status:0 });
       return res.status(200).json(schedule);
    } catch (err) {
       return res.status(500).json({ error: err.message,status:0 });
    }
};


const updateSchedule = async (req, res) => {
    /*  #swagger.tags = ['Schedule'] 
     #swagger.description = 'Endpoint to update an existing schedule.'  
    */
    /*  #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['data'] = {
         in: 'formData',
          type: 'String'
   }
    */
    try {
        const { id } = req.params; 
        const updates = req.body;  

        if (updates.timeSlots) {
            try {
               if (typeof updates.timeSlots === 'string') {
                    updates.timeSlots = JSON.parse(updates.timeSlots);
                }
            } catch (err) {
                return res.status(400).json({ error: 'Invalid timeSlots JSON' ,status:0});
            }
        }

        if (updates.timeSlots) {
            updates.timeSlots = updates.timeSlots.map(slot => ({
                ...slot,  fromTime: new Date(slot.fromTime),toTime: new Date(slot.toTime)
            }));
        }
        const schedule = await Schedule.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found',status:0 });
        }

        res.status(200).json({ message: 'Schedule updated successfully', status:1 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the schedule',status:0 });
    }
};

const deleteSchedule = async (req, res) => {
    /*  #swagger.tags = ['Schedule'] 
        #swagger.description = 'Endpoint to delete a schedule by ID.'  
    */
    try {
        const result = await Schedule.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: 'Schedule not found',status:0 });
       return res.status(200).json({message:'Schedule Deleted Succesfully',status:1}); 
    } catch (err) {
       return res.status(500).json({ error: err.message });
    }
};




module.exports = {createSchedule,listAllSchedules,showSchedule,updateSchedule,deleteSchedule};
