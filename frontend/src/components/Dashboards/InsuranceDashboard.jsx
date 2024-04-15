import React, { useEffect, useState } from 'react';
import { getAllMedicalRecords, processMedicalBillToBlock } from '../../api/web3Functions';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Grid } from '@mui/material';
import PatientDetails from './PatientDetails';

export const InsuranceDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const claimsData = await getAllMedicalRecords(1);
        const updatedClaims = claimsData.map(claim => ({ ...claim, claimed: claim.isProcessed }));
        setClaims(updatedClaims);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };
    fetchClaims();
  }, []);

  const handleClaim = async (patientId, billId) => {
    try {
      await processMedicalBillToBlock(patientId, billId);
      setClaims(claims.map(claim => (claim.patientId === patientId && claim.billId === billId ? { ...claim, claimed: true } : claim)));
      alert('Claim processed successfully.');
    } catch (error) {
      console.error('Error processing claim:', error);
      alert('Error processing claim. Please try again.');
    }
  };

  return (
    
    <Box sx={{ maxWidth: '90%', mx: 'auto' }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <h1>Insurance Dashboard</h1>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PatientDetails patientId={1} />
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <p>Loading...</p>
          ) : claims.length === 0 ? (
            <p>No claims found.</p>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ backgroundColor: '#e6f0ff' }}>
                <TableHead>
                  <TableRow>
                    
                    <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }}>Bill ID</TableCell>
                    <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }}>Treatment Date</TableCell>
                    <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claims.map((claim, index) => (
                    <TableRow key={index}>
                      
                      <TableCell>{parseInt(claim.billId)}</TableCell>
                      <TableCell>{parseInt(claim.amount)}</TableCell>
                      <TableCell>{claim.description}</TableCell>
                      <TableCell>{claim.treatmentDate}</TableCell>
                      <TableCell>
                        {!claim.claimed ? (
                          <Button variant="contained" color="primary" onClick={() => handleClaim(claim.patientId, claim.billId)}>
                            Mark as Claimed
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary" disabled>
                            Claimed
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};