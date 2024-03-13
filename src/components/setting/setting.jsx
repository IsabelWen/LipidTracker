// Imports
import "./setting.scss"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

// Import components
import Genderradio from "../genderradio/genderradio";
import Riskselect from "../riskselect/riskselect";

// Mock Steps
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
    const [data, setData] = useState([]);
    const [activeStep, setActiveStep] = useState(0);


    // Stepper
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };
    

    // Database access
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "results"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                const { hdl } = doc.data();
                if (hdl !== null && hdl !== undefined) {
                    list.push({ id: doc.id, ...doc.data() });
                }
            });

            // Sort the list array by date
            list.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Convert date format to DD/MM/YYYY
            list.forEach((item) => {
                item.date = new Date(item.date).toLocaleDateString('en-GB');
            });

            setData(list);
        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub();
        };
    }, []);

    

    return (
        <div className="setting">
            <h1 className="title">Settings</h1>
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
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
            <div>
            <p>Your target values have been updated successfully!</p>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
            </Button>
            </div>
        )}
        </div>
    );
};

export default Setting;