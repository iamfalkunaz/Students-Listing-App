import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'
import Modal from './Modal'; 

const ListingPage = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = () => {
    const updatedStudents = students.filter(student => student.id !== studentToDelete);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Students Listing</h1>
      <Link to="/add" className="btn btn-primary mb-3">Add Student</Link>
      <div className='table-responsive'>
      <table className="table custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Father Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>CNIC</th>
            <th>Address</th>
            <th>Phone number</th>
            <th>About Yourself</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <tr key={student.id}>
              <td data-label="Name">{student.name}</td>
              <td data-label="Father Name">{student.fatherName}</td>
              <td data-label="Age">{student.age}</td>
              <td data-label="Email">{student.email}</td>
              <td  data-label="CNIC">{student.cnic}</td>
              <td data-label="Address">{student.address}</td>
              <td data-label="Phone number">{student.phoneNumber}</td>
              <td data-label="About Yourself">{student.about}</td>
              <td>
                <Link to={`/edit/${student.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setIsModalOpen(true);
                    setStudentToDelete(student.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ListingPage;
