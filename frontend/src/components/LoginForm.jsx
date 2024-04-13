import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Card, CardContent, Typography, TextField, Checkbox, Button } from '@mui/material';
import { loginUser } from '../api/apiFunctions';
import { initWeb3 } from '../web3config';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const initialize = async () => {
    await initWeb3();
  };
  initialize();
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ username, password });
      console.log('Login successful:', response); // Log successful login response

      if (response.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (response.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (response.role === 'insurance') {
        navigate('/insurance-dashboard')
      } else {
        navigate('/error-page')
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Incorrect username or password'); // Set error message for display
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Card sx={{ padding: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Sign in
            </Typography>
            {error && <Typography variant="body2" color="error" gutterBottom>{error}</Typography>} {/* Display error message if present */}
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please enter your login and password!
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                type="password"
              />
              <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
                <Checkbox />
                <Typography variant="body2">Remember password</Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography variant="body2" marginTop={2}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
