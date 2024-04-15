import React, { useState, useEffect } from 'react';
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
      console.log('Login successful:', response);
      if (response.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (response.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (response.role === 'insurance') {
        navigate('/insurance-dashboard');
      } else {
        navigate('/error-page');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Incorrect username or password');
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
        <Card
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              Sign in
            </Typography>
            {error && (
              <Typography
                variant="body2"
                color="error"
                gutterBottom
                sx={{ marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ marginBottom: 2 }}
            >
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
                sx={{ backgroundColor: '#fff' }}
              />
              <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                type="password"
                sx={{ backgroundColor: '#fff' }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginY: 2,
                }}
              >
                <Checkbox sx={{ color: '#2196f3' }} />
                <Typography variant="body2">Remember password</Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: '#2196f3',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  },
                }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography
          variant="body2"
          marginTop={2}
          sx={{ color: '#666' }}
        >
          Don't have an account? <Link to="/register" style={{ color: '#2196f3' }}>Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;