import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { addMedicalBillToBlock  } from '../../api/web3Functions';

const MedicalRecordForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billDescription, setBillDescription] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Add medical bill to the blockchain
      await addMedicalBillToBlock(name, age, medicalHistory, billAmount, billDescription, treatmentDate);

      // Reset form fields
      setName('');
      setAge('');
      setMedicalHistory('');
      setBillAmount('');
      setBillDescription('');
      setTreatmentDate('');
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Medical Record
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Medical History"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Bill Amount"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Bill Description"
          value={billDescription}
          onChange={(e) => setBillDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Treatment Date"
          value={treatmentDate}
          onChange={(e) => setTreatmentDate(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default MedicalRecordForm;