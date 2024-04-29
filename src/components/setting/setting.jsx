// Imports
import "./setting.scss"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { collection, doc, updateDoc, where, getDoc, query, getDocs, onSnapshot, setData } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

// Import components
import Genderradio from "../genderradio/genderradio";
import Riskselect from "../riskselect/riskselect";

// Steps
const steps = [
    {
        label: 'Update your settings',
        description: `Click continue to update your settings.`
    },
    {
        label: 'Select a gender',
        description: `Gender can impact HDL cholesterol levels because women tend to have higher levels of HDL 
        cholesterol compared to men. This difference is partly attributed to hormonal influences, particularly 
        estrogen, which tends to raise HDL levels. Therefore, the target for the hdl level is set accordingly to the gender.`,
        content: <Genderradio/>   
    },
    {
        label: 'Select a risk level',
        description:
            `It's important to note that individual risk factors, such as age, gender, family history, smoking, and 
            other health conditions, can influence your overall risk level. It's recommended to consult with a
            doctor or a lipid specialist for accurate risk assessment and personalized management strategies.`,
        content: <Riskselect/> 
    },
];

// Main
const Setting = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [targetData, setTargetData] = useState({cholesterol: 'No data', ldl: 'No data', hdl: 'No data', triglycerides: 'No data'});
    const [genderData, setGendertData] = useState('No data');
    const [risklevelData, setRisklevelData] = useState('No data');
    const {currentUser} = useContext(AuthContext)
    const user = currentUser;
    const userUID = user ? user.uid : null; 

    // Stepper
    const handleNext = () => {
        if (activeStep === steps.length -1) {
            handleChange();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Get the target field, gender and risk level of user
    useEffect(() => {
        const userRef = collection(db, "users");
        const userDoc = doc(userRef, userUID);
        const unsub = onSnapshot(userDoc, (doc) => {
            if (doc.exists()) {
                if (doc.data().target) {
                    setTargetData(doc.data().target);
                }
                if (doc.data().gender) {
                    setGendertData(doc.data().gender);
                }
                if (doc.data().gender) {
                    setRisklevelData(doc.data().riskLevel);
                }
            }
        }, (error) => {
            console.log(error);
        });
    
        return () => {
            unsub();
        };
    }, []);
    
    // Set new riskLevelID
    const handleChange = async (event) => {
        const usersCol = collection(db, "users");
        const userDoc = doc(usersCol, userUID);
        const targetsCol = collection(db, "targets");

        // Get the user's gender and risk level
        const userSnapshot = await getDoc(userDoc); // Use getDoc() function instead of get()

        if (!userSnapshot.exists()) {
            console.log("User document not found.");
            return;
        }

        const userData = userSnapshot.data();
        const userGender = userData.gender;
        const userRiskLevel = userData.riskLevel;

        // Query the targets collection to find the matching target document
        const targetQuerySnapshot = await getDocs(
            query(targetsCol, where("gender", "==", userGender), where("name", "==", userRiskLevel))
        )
        
        const targetData = targetQuerySnapshot.docs[0].data();

        // Check if any matching target document is found
        if (!targetData.empty) {
            // Update the user document with the riskLevelID from the target document
            updateDoc(userDoc, {
                target: targetData,
            }).then(() => {
                alert("Your target values have been updated successfully!");
                console.log("Document successfully updated!");
                window.location.reload();
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        } else {
        console.log("No matching target document found.");
        }
    };

    return (
        <div className="setting">
            <h1 className="title">Settings</h1><br/>

            <h3>Current Settings</h3><br/>
            <div className="personalinfo">
                <div style={{cursor: 'pointer'}} className="info" onClick={handleOpen}>
                    <p><b>Gender:</b></p><p style={{color: '#00796b', textTransform: 'capitalize'}}>{genderData}</p>
                </div>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 320,
                    maxWidth: '90%',
                    bgcolor: 'background.paper',
                    border: 'none',
                    boxShadow: 24,
                    p: 4,
                    }}>
                        <h2 style={{padding: '5px'}}>Gender-Based HDL Targets</h2>
                        <p style={{padding: '5px'}}><i>Further Explanation in FAQ</i></p>
                        <Table aria-label="gender-based HDL targets table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Gender</b></TableCell>
                                    <TableCell align="right"><b>HDL target&nbsp;(mg/dL)</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Female</TableCell >
                                    <TableCell align="right">50</TableCell >
                                </TableRow>
                                <TableRow>
                                    <TableCell >Male</TableCell >
                                    <TableCell align="right">40</TableCell >
                                </TableRow>
                                <TableRow>
                                    <TableCell >Other</TableCell >
                                    <TableCell align="right">45</TableCell >
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Modal>
                
                <Tooltip placement="bottom" title="Explore the FAQ section for risk level insights." arrow>
                    <div className="info">
                        <p><b>Risk Level:</b></p><p style={{color: '#00796b'}}>{risklevelData}</p>
                    </div>
                </Tooltip>
            </div>

            <h3>Current Target Values</h3><br/>
            <div className="targets">
                <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1, width: 128, height: 128,
                    '@media (max-width: 780px)': {
                        width: 200,},
                    '@media (max-width: 511px)': {
                        width: 128,},
                    },
                }}
                >
                    <Paper className='targetinfo' elevation={3} style={{backgroundColor: '#619ED6', borderRadius: '15px'}}>
                        <p><b>Cholesterol:</b></p>
                        <h1>{targetData.cholesterol}</h1>
                    </Paper>
                </Box>
                <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1, width: 128, height: 128,
                    '@media (max-width: 780px)': {
                        width: 200,},
                    '@media (max-width: 511px)': {
                        width: 128,},
                    },
                }}
                >
                    <Paper className='targetinfo' elevation={3} style={{backgroundColor: '#E48F1B', borderRadius: '15px'}}>
                        <p><b>LDL:</b></p>
                        <h1>{targetData.ldl}</h1>
                    </Paper>
                </Box>
                <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1, width: 128, height: 128,
                    '@media (max-width: 780px)': {
                        width: 200,},
                    '@media (max-width: 511px)': {
                        width: 128,},
                    },
                }}
                >
                    <Paper className='targetinfo' elevation={3} style={{backgroundColor: '#689b5b', borderRadius: '15px'}}>
                        <p><b>HDL:</b></p>
                        <h1>{targetData.hdl}</h1>
                    </Paper>
                </Box>
                <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1, width: 128, height: 128,
                    '@media (max-width: 780px)': {
                        width: 200,},
                    '@media (max-width: 511px)': {
                        width: 128,},
                    },
                }}
                >
                    <Paper className='targetinfo' elevation={3} style={{backgroundColor: '#E64345', borderRadius: '15px'}}>
                    <p><b>Triglycerides:</b></p>
                        <h1>{targetData.triglycerides}</h1>
                    </Paper>
                </Box>
            </div>
            
            <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
            <Step key={step.label}>
                <StepLabel>
                    {step.label}
                </StepLabel>
                <StepContent>
                <p>{step.description}</p><br/>
                {step.content}
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Button
                        variant="contained"
                        sx={{ mt: 1, mr: 1 , background:' #00796b', '&:hover': {backgroundColor: '#00796b'}}}
                        onClick={handleNext}
                    >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1, color:' #00796b'}}
                    >
                        Back
                    </Button>
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        </div>
    );
};

export default Setting;