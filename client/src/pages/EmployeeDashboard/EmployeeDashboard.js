import React, { useState } from 'react';

import { Container, Row, Button, Col, Form } from 'react-bootstrap/';
import Navigation from '../../components/Navigation';

export function EmployeeDashboard(props) {

  const [newTicketId, setNewTicketId] = useState(-1);

  const counterId = 1;

  /**
   * Create ticket
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const data = await fetch(`/api/tickets/next/${counterId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const response = await data.json();
      if (response.ticketId)
        setNewTicketId(response.ticketId);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="theme-scheme">
      <Navigation loggedIn={props.isLoggedIn} />
      <div className="view">
        <Row className="vh-100">
          <Col>
            <div className="Card">
              <h3 className="text-center">Next client to serve</h3>
              <h1 className="text-center mt-4 mb-4">{(newTicketId !== -1) ? newTicketId : '-'}</h1>
            </div>
          </Col>
          <Col>
            <div className="Card">
              <Form onSubmit={handleSubmit}>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" type="submit" style={{ width: '100%' }}>
                    Call next client
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}