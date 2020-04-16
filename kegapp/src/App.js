import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Button, Table, Row, Col } from 'reactstrap';
import './App.css';

function App() {

  const [table, setTable] = useState([]);

  useEffect(() => {
    fetch('./retrieve').then(res => res.json()).then(data => {
        console.log(data)
	setTable(data);
    });
  }, []);

  return (
    <div className="App">
      <Row>
      </Row>  
      <Row>
	<Col sm={3}/>
        <Col sm={6} className="table">
          <Table>
            <thead>
              <tr className="stick-column">
	        <th>Beers</th>
	        <th>Weight</th>
	        <th>Date</th>
              </tr>
            </thead>
            <tbody>     
	    {table.map((item, key) => {
	       return <tr key={key}>
	         <th scope="row">{item.beers}</th>
  	         <th>{item.weight}</th>
	         <th>{item.date}</th>
	       </tr>
	    })}
	    </tbody>
          </Table>
        </Col>
        <Col sm={3}/>
      </Row>
    </div>
  );
}

export default App;
