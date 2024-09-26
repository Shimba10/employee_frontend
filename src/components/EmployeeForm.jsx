import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/form.css';

function EmployeeForm() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments/')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/employees/', { name, department, address })
      .then(() => {
        navigate('/employees');
      })
      .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Employee</h2>
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input"
      />
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
        className="input"
      >
        <option value="">Select Department</option>
        {departments.map(dept => (
          <option key={dept.id} value={dept.id}>{dept.name}</option>
        ))}
      </select>
      <textarea
        placeholder="Employee Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="input"
      />
      <button type="submit" className="button">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;