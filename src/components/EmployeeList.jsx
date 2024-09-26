import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/employeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments/')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));

    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    let url = 'http://localhost:8000/api/employees/';
    if (nameFilter || departmentFilter) {
      url += '?';
      if (nameFilter) url += `name=${nameFilter}&`;
      if (departmentFilter) url += `department=${departmentFilter}`;
    }
    axios.get(url)
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  };

  useEffect(() => {
    fetchEmployees();
  }, [nameFilter, departmentFilter]);

  return (
    <div className="employeeList">
      <h2>Employees</h2>
      <Link to="/employees/add" className="addButton">Add Employee</Link>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="filterInput"
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="filterSelect"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
      </div>
      <ul>
        {employees.map(emp => (
          <li key={emp.id} className="employeeItem">
            <strong>{emp.name}</strong> - {emp.department_name} - {emp.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
