import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/apiFunctions';

export const DoctorDashboard = () => {
    const [showPatientForm, setShowPatientForm] = useState(false);
    const [isRegistration] = useState(false);  //extra
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    

    const handleWriteRecord = () => setShowPatientForm(true);
    const handleReadRecord = () => {
        console.log('Reading patient record...');
    };

    const handleDialogClose = () => {
        setShowPatientForm(false);
        
    };

    const newRegistration=()=>{
        navigate('/new-patient-registration'); 
    }

    const handleSubmitPatientId = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser({ username, password });
            if (response.role === 'patient') {
                navigate('/create-medical-record');
            }else{
                console.error('Login failed:', "Not patient details");
                setError('Not patient details');
            }
            
            console.log('Login successful:', response); // Log successful login response
        } catch (error) {
            console.error('Login failed:', error);
            setError('Incorrect username or password');
        }
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
                    <TextField label="Patient ID" value={username} onChange={(e)=> setUsername(e.target.value)} />
                    <TextField label="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
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