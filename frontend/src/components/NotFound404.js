import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';

function NotFound404() {
  const location = useLocation()  
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Error 404</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Page by URL "{location.pathname}" not found</p>
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default NotFound404;