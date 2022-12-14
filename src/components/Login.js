import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../style.scss";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [state, setState] = useState({firstName: ''});
  const [role, setRole] = useState();

  async function fetchData() {
    const response = await axios.get('https://api.fake-rest.refine.dev/users/1');
  }

    React.useEffect(() => {
      const data = fetchData();
      setState(data);
    }, []);

  const handleSubmit = (e) => {
    setShowUser(false);
    e.preventDefault();

    if (validateEmail(email)) {
      const {role} = validateEmail(email);
      setShowUser(true);
      setError("");
      setRole(role);
      return;
    }
    setError("Email is not valid");
    return false;
  };

  const resetForm = () => {
    setError("");
    setEmail("");
    setPassword("");
    setShowUser(false);
    setRole('');
  };

  return (
    <>
      <h2 color="text-color">We will Test the Login Form Component</h2>
      {showUser && (
      <Alert data-testid="user" variant="success">
        {email}
      </Alert>
      )}
      {error && (
        <Alert data-testid="error" variant="danger">
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button data-testid="submit" variant="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="secondary"
          data-testid="reset"
          onClick={resetForm}
          style={{ marginLeft: "5px" }}
        >
          Reset
        </Button>
        {(role === 'admin' && !error) && <Button data-testid="passwordReset" variant="primary" style={{ marginLeft: "5px" }}>Reset Password</Button>}
        {(role === 'user' &&  !error) && <Button data-testid="passwordResetDisabled" disabled style={{ marginLeft: "5px", cursor: 'not-allowed' }}>Reset Password</Button>}
      </Form>
    </>
  );
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (regex.test(email) && email.includes('admin')) {
    return {status:true, role:'admin'};
  } else if(regex.test(email) && email.includes('user')){
    return {status:true, role:'user'};
  } else if(regex.test(email)){
    return true;
  } 
  return false;
};

export default Login;
