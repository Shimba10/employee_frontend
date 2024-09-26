import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/form.css';

function DepartmentForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/departments/', { name, description })
      .then(() => {
        navigate('/departments');
      })
      .catch(error => console.error('Error adding department:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Department</h2>
      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input"
      />
      <textarea
        placeholder="Department Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="input"
      />
      <button type="submit" className="button">Add Department</button>
    </form>
  );
}

export default DepartmentForm;