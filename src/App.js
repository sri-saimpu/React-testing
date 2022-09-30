import React,{useEffect, useState, useMemo} from 'react';
import axios from "axios";
import {Col, Row} from "react-bootstrap";
import Login from "./components/Login.js";


function App() {

  return (
    <div className="Container app-container" role="parent">
      <Row>
        <Col>
          <h1>React testing</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Login data-test-id="child" />
        </Col>
      </Row>
    </div>
  );
} 

export default App;     
