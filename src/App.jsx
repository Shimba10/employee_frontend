import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import EmployeeList from './components/EmployeeList';
import DepartmentForm from './components/DepartmentForm';
import EmployeeForm from './components/EmployeeForm';
import './assets/app.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/employees">Employees</Link></li>
          </ul>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/departments/add" element={<DepartmentForm />} />
            <Route path="/employees/add" element={<EmployeeForm />} />
            <Route path="/" element={<h1>Welcome to Employee Management System</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
