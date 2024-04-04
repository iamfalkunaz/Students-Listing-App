import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudentForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.id === parseInt(id));
    if (student) {
      setFormData(student);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.fatherName.trim()) {
      errors.fatherName = "Father Name is required";
      isValid = false;
    }

    if (!formData.age.trim()) {
      errors.age = "Age is required";
      isValid = false;
    } else if (isNaN(formData.age) || formData.age <= 0) {
      errors.age = "Age must be a valid positive number";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.cnic.trim()) {
      errors.cnic = "CNIC is required";
      isValid = false;
    } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]$/.test(formData.cnic)) {
      errors.cnic = "CNIC is invalid";
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (!/^\d{11}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be a valid 11-digit number";
      isValid = false;
    }

    if (!formData.about.trim()) {
      errors.about = "About Yourself is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const updatedStudents = students.map(student => {
        if (student.id === parseInt(id)) {
          return { ...student, ...formData };
        }
        return student;
      });
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="name" name="name" value={formData.name || ''} onChange={handleChange} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="fatherName" className="form-label">Father Name</label>
          <input type="text" className={`form-control ${errors.fatherName && 'is-invalid'}`} id="fatherName" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} />
          {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="number" className={`form-control ${errors.age && 'is-invalid'}`} id="age" name="age" value={formData.age || ''} onChange={handleChange} />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" value={formData.email || ''} onChange={handleChange} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="cnic" className="form-label">CNIC</label>
          <input type="text" className={`form-control ${errors.cnic && 'is-invalid'}`} id="cnic" name="cnic" value={formData.cnic || ''} onChange={handleChange} />
          {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className={`form-control ${errors.address && 'is-invalid'}`} id="address" name="address" value={formData.address || ''} onChange={handleChange} />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input type="text" className={`form-control ${errors.phoneNumber && 'is-invalid'}`} id="phoneNumber" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} />
          {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">About Yourself</label>
          <textarea className={`form-control ${errors.about && 'is-invalid'}`} id="about" name="about" value={formData.about || ''} onChange={handleChange} />
          {errors.about && <div className="invalid-feedback">{errors.about}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
