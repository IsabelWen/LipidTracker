// Imports
import "./setting.scss"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import { collection, doc, updateDoc, where, getDoc, query, getDocs, onSnapshot, setData } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

// Import components
import Genderradio from "../genderradio/genderradio";
import Riskselect from "../riskselect/riskselect";

// Steps
const steps = [
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
    const [targetData, setTargetData] = useState({});
    const [genderData, setGendertData] = useState();
    const [risklevelData, setRisklevelData] = useState();
    const {currentUser} = useContext(AuthContext)
    const user = currentUser;
    const userUID = user ? user.uid : null; 
    const navigate = useNavigate();

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

    // Get the target field, gender and risk level of user
    useEffect(() => {
        const userRef = collection(db, "users");
        const userDoc = doc(userRef, userUID);
        const unsub = onSnapshot(userDoc, (doc) => {
            if (doc.exists()) {
                setTargetData(doc.data().target);
                setGendertData(doc.data().gender);
                setRisklevelData(doc.data().riskLevel);
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
                navigate("/");
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
            <p><b>Gender:</b> {genderData}</p>
            <p><b>Risk Level:</b> {risklevelData}</p><br/>
            <h3>Current Target Values</h3><br/>
            <p><b>Cholesterol:</b> {targetData.cholesterol}</p>
            <p><b>LDL-Cholesterol:</b> {targetData.ldl}</p>
            <p><b>HDL-Cholesterol:</b> {targetData.hdl}</p>
            <p><b>Triglycerides:</b> {targetData.triglycerides}</p><br/>
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