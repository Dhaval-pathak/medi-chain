import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

export const DoctorDashboard = () => {
    const [showPatientForm, setShowPatientForm] = useState(false);
    const [isRegistration] = useState(false);  //extra
    const [patientId, setPatientId] = useState('');
    const navigate = useNavigate();

    

    const handleWriteRecord = () => setShowPatientForm(true);
    const handleReadRecord = () => {
        console.log('Reading patient record...');
    };

    const handlePatientIdChange = (event) => setPatientId(event.target.value);
    const handleDialogClose = () => {
        setShowPatientForm(false);
        
    };

    const newRegistration=()=>{
        navigate('/new-patient-registration'); 
    }

    const handleSubmitPatientId = () => {
        navigate('/create-medical-record'); 

    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>

            {/* Read Patient Record Button */}
            <Button
                variant="contained"
                onClick={handleReadRecord}
                style={{ backgroundColor: 'green', marginBottom: '16px' }}
            >
                Read Patient Record
            </Button>


            <Button
                variant="contained"
                onClick={handleWriteRecord}
                style={{ backgroundColor: 'blue', marginBottom: '16px' }}
            >
                Write Patient Record
            </Button>



            {/* Patient Identification Dialog */}
            <Dialog open={showPatientForm} onClose={handleDialogClose}>
                <DialogTitle>Patient Identification</DialogTitle>
                <DialogContent>
                    <TextField label="Patient ID" value={patientId} onChange={handlePatientIdChange} />
                    <TextField label="Password" type="password" />
                    <Button onClick={newRegistration}>Not Registered?</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSubmitPatientId}>Submit</Button>
                </DialogActions>
            </Dialog>

            {/* New Patient Registration Dialog */}
            <Dialog open={isRegistration} onClose={handleDialogClose}>
                {/* ... Content of NewPatientRegistration component ... */}
            </Dialog>

            {/* Show PrescriptionForm if successfully authenticated */}
            {/* {isAuthenticated && (
        <PrescriptionForm patientId={patientId} /> 
      )} */}
        </div>
    );
};
