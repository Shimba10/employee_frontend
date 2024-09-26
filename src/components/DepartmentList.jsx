import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/departmentList.css';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments/')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  return (
    <div className="departmentList">
      <h2>Departments</h2>
      <Link to="/departments/add" className="addButton">Add Department</Link>
      <ul>
        {departments.map(dept => (
          <li key={dept.id} className="departmentItem">
            <strong>{dept.name}</strong> - {dept.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;