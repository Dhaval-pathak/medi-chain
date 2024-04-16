import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { registerUser } from '../api/apiFunctions';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [role, setRole] = useState('doctor');
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const result = await registerUser({ username, email, password, role });
      console.log('Registration result:', result);
      setSuccessMessage(result);
      navigate('/');
    } catch (error) {
      console.log('Registration failed', error);
      setErrorMessage(error.response.data.error);
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
              Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                sx={{ backgroundColor: '#fff' }}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />

              <Typography
                variant="body1"
                gutterBottom
                sx={{ marginTop: 2, color: '#333' }}
              >
                Select Role:
              </Typography>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginBottom: '1rem',
                  backgroundColor: '#fff',
                }}
              >
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="insurance">Insurance Company</option>
              </select>

              {successMessage && (
                <Alert variant="filled" severity="success" sx={{ marginTop: 2 }}>
                  {successMessage}
                </Alert>
              )}

              {errorMessage && (
                <Alert variant="filled" severity="error" sx={{ marginTop: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 2,
                  backgroundColor: '#2196f3',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  },
                }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography
          variant="body2"
          marginTop={2}
          sx={{ color: '#666' }}
        >
          Already have an account? <Link to="/" style={{ color: '#2196f3' }}>Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationForm;