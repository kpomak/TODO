import React from 'react';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <div className="bg-light">
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="https://devlev22.de" target='_blank'>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://djangoproject.com">Django</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://django-rest-framework.org">REST</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <p className="text-center mt-4 mb-4">Dhango REST Framework 2022</p>
    </div>
  );
}

export default Footer;