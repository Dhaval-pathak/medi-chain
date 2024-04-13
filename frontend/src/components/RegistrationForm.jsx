import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import {registerUser} from '../api/apiFunctions';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [role, setRole] = useState('doctor'); // State for storing selected role

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear error message before submission
    setSuccessMessage('');

    // Validate password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords does not match');
      return;
    }

    try {
      const result = await registerUser({ username, email, password ,role});
      console.log('Registration result:', result);
      setSuccessMessage(result);
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
        <Card sx={{ padding: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
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

              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Typography variant="body1" gutterBottom>
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
                }}
              >
                
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="insurance">Insurance Company</option>
              </select>

              {successMessage &&
                <Alert variant="filled" severity="success">
                  {successMessage}
                </Alert>
              }

              {errorMessage &&
                <Alert variant="filled" severity="error">
                  {errorMessage}
                </Alert>
              }



              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography variant="body2" marginTop={2}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationForm;