import React, { useEffect, useState } from 'react';
import { getAllMedicalRecords } from '../../api/web3Functions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const PatientDashboard = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const patientId = 1;
        const records = await getAllMedicalRecords(patientId);
        setMedicalRecords(records);
        console.log(records)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, []);

  return (
    <div>
      <h1>Patient Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : medicalRecords.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="medical records table">
            <TableHead>
              <TableRow>
                <TableCell>Bill ID</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Treatment Date</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{parseInt(record.billId)}</TableCell>
                  <TableCell align="right">{parseInt(record.amount)}</TableCell>
                  <TableCell align="right">{record.description}</TableCell>
                  <TableCell align="right">{record.treatmentDate}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
