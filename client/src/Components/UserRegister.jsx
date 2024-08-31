import React, { useState } from 'react';
import axios from 'axios'


const LIVE_HOST=process.env.LIVE_HOST;
const LIVE_PORT=process.env.LIVE_PORT

export default function UserRegister() {

  const [formData, setFormData] = useState({
    firstName: '',  
    lastName: '',
    email: '',
    defaultBranch: '',
    serviceCategory: '',
    serviceName: '',
    dateRange: 'ongoing',
    fromDate: '',
    toDate: '',
    sameAsEveryday: true,
    timeSlots: [],
  });

  const [file, setFile] = useState(null);
  const [showCustomDates, setShowCustomDates] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateRangeChange = (e) => {
    const value = e.target.value;
    setShowCustomDates(value === 'custom');
    setFormData(prevData => ({
      ...prevData,
      dateRange: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('data', JSON.stringify(formData));
    if (file) form.append('image', file);
  console.log('fdfdd',form)
    try {
      const response = await axios.post(`http://${LIVE_HOST}:${LIVE_PORT}/api/staff`, form, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      console.log('fsdfsds',response)
      alert('Staff Data Added Successfully');
    } catch (err) {
      alert(`Error: ${err.response ? err.response.data.error : err.message}`);
    }
  };
  

  return (
    <div className="container">
      <h1>User Registration</h1>
      <form id="registrationForm" encType="multipart/form-data" onSubmit={handleSubmit}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="tab-1" data-toggle="tab" href="#tab-content-1" role="tab" aria-controls="tab-content-1" aria-selected="true">1</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="tab-2" data-toggle="tab" href="#tab-content-2" role="tab" aria-controls="tab-content-2" aria-selected="false">2</a>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="tab-content-1" role="tabpanel" aria-labelledby="tab-1">
            <fieldset>

              <legend>Staff Details</legend>
              <div className="form-group">
                <label htmlFor="image">Profile Image:</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="defaultBranch">Default Branch:</label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultBranch"
                  name="defaultBranch"
                  value={formData.defaultBranch}
                  onChange={handleInputChange}
                  required
                />
              </div>
             
            </fieldset>
          </div>

          <div className="tab-pane fade" id="tab-content-2" role="tabpanel" aria-labelledby="tab-2">
            <legend>Schedule</legend>
            <div className="form-group">
              <label htmlFor="serviceCategory">Service Category:</label>
              <select
                className="form-control"
                id="serviceCategory"
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleInputChange}
                required
              >
                <option value="Category1">Category1</option>
                <option value="Category2">Category2</option>
                <option value="Category3">Category3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="serviceName">Service Name:</label>
              <select
                className="form-control"
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                required
              >
                <option value="Service1">Service1</option>
                <option value="Service2">Service2</option>
                <option value="Service3">Service3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateRange">Date Range:</label>
              <select
                className="form-control"
                id="dateRange"
                name="dateRange"
                value={formData.dateRange}
                onChange={handleDateRangeChange}
                required
              >
                <option value="ongoing">Ongoing</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {showCustomDates && (
              <div className="form-group">
                <label htmlFor="fromDate">From Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="fromDate"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                />
                <label htmlFor="toDate">To Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="toDate"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="sameAsEveryday">Same as Everyday:</label>
              <input
                type="checkbox"
                id="sameAsEveryday"
                name="sameAsEveryday"
                checked={formData.sameAsEveryday}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlots">Time Slots:</label><br />
              <input type="text" id="timeSlotBranch" className="form-control" placeholder="Branch"/>
              <input
                type="time" id="fromTime" className="form-control"/>
              <input type="time" id="toTime" className="form-control"/>
              <button type="button" className="btn btn-primary" id="addTimeSlot" >
                Add Time Slot
              </button>
              <div id="timeSlotsList">
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-3">Register</button>
        </div>
      </form>
    </div>
  );
}
