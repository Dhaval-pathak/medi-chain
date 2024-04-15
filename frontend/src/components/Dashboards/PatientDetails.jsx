import React, { useState, useEffect } from 'react';
import { getPatientDetailFromBlock } from '../../api/web3Functions';
import { Box, Typography, Avatar, Grid, Paper, Divider } from '@mui/material';

const PatientDetails = ({ patientId }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getPatientDetailFromBlock(patientId);
        setPatientData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  return (
    <Box
      sx={{
        backgroundColor: '#2a6d98',
        color: '#fff',
        padding: 4,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      {loading ? (
        <Typography variant="h6">Loading patient details...</Typography>
      ) : patientData ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#fff',
            color: '#333',
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Avatar
            src={patientData.imageUrl}
            alt={patientData.name}
            sx={{ width: 120, height: 120, margin: 'auto' }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              {patientData.name},&nbsp;
            </Typography>
            <Typography variant="h5" gutterBottom>
              {parseInt(patientData.age)} years
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="body2">Age</Typography>
              <Typography variant="body1" fontWeight="bold">
                {parseInt(patientData.age)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Blood Group</Typography>
              <Typography variant="body1" fontWeight="bold">
                {patientData.bloodGroup}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Gender</Typography>
              <Typography variant="body1" fontWeight="bold">
                {patientData.gender}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Occupation</Typography>
              <Typography variant="body1" fontWeight="bold">
                {patientData.occupation}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="body2">Mobile Number</Typography>
              <Typography variant="body1" fontWeight="bold">
                {patientData.mobileNumber}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Email</Typography>
              <Typography variant="body1" fontWeight="bold">
                {patientData.email}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="h6">No patient details found.</Typography>
      )}
    </Box>
  );
};

export default PatientDetails;