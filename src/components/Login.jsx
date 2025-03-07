import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const history = useHistory();

 

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password === form.password && item.email === form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/success');
        } else {
          history.push('/error');
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </FormGroup>
      <FormGroup check>
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          checked={form.terms}
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={Object.keys(errors).length > 0}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
