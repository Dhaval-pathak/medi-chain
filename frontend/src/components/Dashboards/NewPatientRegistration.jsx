import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { registerUser } from '../../api/apiFunctions';
import { addPatientToBlock } from '../../api/web3Functions';
import {
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
} from '@mui/material';

const NewPatientRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNo: '',
        email: '',
        bloodGroup: '',
        occupation: '',
        maritalStatus: '',
        dateOfBirth: null,
        patientHistory: '',
        sex: '',
    });

    const [error, setError] = useState(null);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const username = uuidv4();
        const password = "123456";
        const role = 'patient';
        const { email } = formData;
        registerUser({ username, email, password ,role})
        .then( async (res) => { await addPatientToBlock(formData, res.id) })
        .catch((err) => {
            console.log(err);
        });
        

        // Handle form submission logic here
        // await addPatientToBlock(formData, result.id);
        
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 600,
                margin: '0 auto',
                padding: 4,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 4,
                background:'#e3f2fd'
            }}
        >
            <Typography variant="h4" gutterBottom>
                ADD PATIENT
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Mobile No."
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            {/* Add more blood group options */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Marital Status</InputLabel>
                        <Select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="single">Single</MenuItem>
                            <MenuItem value="married">Married</MenuItem>
                            {/* Add more marital status options */}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Sex</InputLabel>
                        <Select
                            name="sex"
                            value={formData.sex}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            {/* Add more marital status options */}
                        </Select>
                    </FormControl>
                </Grid>



                <Grid item xs={12}>
                    <TextField
                        label="Patient History"
                        name="patientHistory"
                        value={formData.patientHistory}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Grid>


                <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
                    <Box display="flex" justifyContent="space-between" width={300}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                setFormData({
                                    firstName: '',
                                    lastName: '',
                                    username: '',
                                    mobileNo: '',
                                    email: '',
                                    bloodGroup: '',
                                    occupation: '',
                                    maritalStatus: '',
                                    dateOfBirth: null,
                                    patientHistory: '',
                                    sex: '',
                                })
                            }
                        >
                            Reset
                        </Button>
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                            Create Profile
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewPatientRegistration;