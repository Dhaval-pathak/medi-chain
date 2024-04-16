import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { addMedicalBillToBlock  } from '../../api/web3Functions';
import { useParams } from 'react-router-dom';

const MedicalRecordForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [billAmount, setBillAmount] = useState(0);
  const [billDescription, setBillDescription] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Add medical bill to the blockchain
      await addMedicalBillToBlock(params.id, name, age, medicalHistory, billAmount, billDescription, treatmentDate);

      // Reset form fields
      setName('');
      setAge('');
      setMedicalHistory('');
      setBillAmount(0);
      setBillDescription('');
      setTreatmentDate('');
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };


   return (
    
      <Container maxWidth="xs" style={{ backgroundColor: '#e3f2fd', padding: '2rem', borderRadius: '10px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#3f51b5', marginBottom: '1rem' }}>
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
            variant="outlined"
            size="small"
          />
          <TextField
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            size="small"
          />
          <TextField
            label="Medical History"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            size="small"
          />
          <TextField
            label="Bill Amount"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            size="small"
          />
          <TextField
            label="Bill Description"
            value={billDescription}
            onChange={(e) => setBillDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            size="small"
          />
          <TextField
            label="Treatment Date"
            value={treatmentDate}
            onChange={(e) => setTreatmentDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem', backgroundColor: '#3f51b5' }}
          >
            Submit
          </Button>
        </form>
      </Container>
    
  );
};

export default MedicalRecordForm;