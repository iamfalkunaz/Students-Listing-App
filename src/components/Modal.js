import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
      <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: '5px' }}>
        <p>Are you sure you want to delete this student?</p>
        <div>
          <button onClick={onConfirm} className="btn btn-danger">Yes</button>
          <button onClick={onClose} className="btn btn-secondary" style={{ marginLeft: '10px' }}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
