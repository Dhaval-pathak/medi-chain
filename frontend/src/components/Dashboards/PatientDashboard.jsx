import React, { useEffect, useState } from 'react';
import { getAllMedicalRecords, assignInsuranceCompanyToBlock } from '../../api/web3Functions';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal, Fade } from '@mui/material';
import PatientDetails from './PatientDetails';
import { useParams } from 'react-router-dom';


export const PatientDashboard = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insuranceCompanyAddress, setInsuranceCompanyAddress] = useState('');
  const [assigningInsurance, setAssigningInsurance] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State for controlling the modal
  const [billId,setBillIdOnClick]=useState(0);

  const params = useParams();

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const patientId = params.id; 
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

  const handleAssignInsurance = async () => {
    console.log(parseInt(billId))
    if (!insuranceCompanyAddress) {
      alert('Please provide an insurance company address.');
      return;
    }

    setAssigningInsurance(true);
    try {
      // Assuming there's a function to assign insurance company in your API
      await assignInsuranceCompanyToBlock(params.id,parseInt(billId), insuranceCompanyAddress);
      alert('Insurance company assigned successfully.');
      setInsuranceCompanyAddress('');
      // You might want to refresh medical records here or update the specific record's insurance company
    } catch (error) {
      console.error('Error assigning insurance company:', error);
      alert('Error assigning insurance company. Please try again.');
    } finally {
      setAssigningInsurance(false);
    }
  };

  const handleOpenModal = (billId) => {
    setOpenModal(true);
    setBillIdOnClick(billId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (

    <Box sx={{ maxWidth: '90%', mx: 'auto' }}>
      <Box
        sx={{
          backgroundColor: '#2a6d98',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Patient Dashboard</h1>
      </Box>
      
      <PatientDetails patientId={params.id} />
      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Fade in={openModal}>
          <Box sx={{ bgcolor: 'white', p: 4, width: 400 }}>
            <h2 id="modal-modal-title">Insurance Company Address</h2>
            <TextField
              label="Insurance Company Address"
              value={insuranceCompanyAddress}
              onChange={(e) => setInsuranceCompanyAddress(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAssignInsurance}
              disabled={assigningInsurance}
            >
              Assign Insurance
            </Button>
          </Box>
        </Fade>
      </Modal>
      {loading ? (
        <p>Loading...</p>
      ) : medicalRecords.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#f0f8ff', maxWidth: '100%' }}>
          <Table sx={{ backgroundColor: '#e6f0ff' }} aria-label="medical records table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }}>Bill ID</TableCell>
                <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }} align="right">Amount</TableCell>
                <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }} align="right">Description</TableCell>
                <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }} align="right">Treatment Date</TableCell>
                <TableCell sx={{ backgroundColor: '#b3d9ff', fontWeight: 'bold' }} align="right">Status</TableCell> {/* Added Status column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{parseInt(record.billId)}</TableCell>
                  <TableCell align="right">{parseInt(record.amount)}</TableCell>
                  <TableCell align="right">{record.description}</TableCell>
                  <TableCell align="right">{record.treatmentDate}</TableCell>
                  <TableCell align="right">{record.isProcessed ?
                    <Button variant="contained" color="primary" disabled>
                      Claimed
                    </Button> :
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(record.billId)} >
                      Not Claimed
                    </Button>
                  }</TableCell> {/* Display Status */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
