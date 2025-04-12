// Import scss
import "../pages.scss";
import "./faq.scss";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Main
const FAQ = () => {
    const [expanded, setExpanded] = useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="page">
            <Sidebar className="sidebar" />
            <div className="pageContainer">
                <div className="content">
                    <div className="title">
                        FAQ
                    </div>
                    <div className="accordionContainer">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accordion">
                            <AccordionSummary
                            className="accordionTitle"
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                                Where can I add my test results?
                            </AccordionSummary>
                            <hr />
                            <AccordionDetails className="accordionDetails">
                                To add test results, follow these steps:
                                <br/><br/>
                                1. On the sidebar, locate and click on "Test Results." You'll see a table displaying all the results you've previously added.
                                <br/>
                                2. In the top right corner of the page, you'll find a button labeled "Add Test Results." Click on it to proceed.
                                <br/>
                                3. You'll be directed to a form where you can input your cholesterol values, the date of the test result, and any 
                                additional notes you'd like to include.
                                <br/>
                                4. After filling in the necessary information, click on the button below the form labeled "Add".
                                <br/><br/>
                                It's important to note that you don't need to provide all values. If your test results only include one of the 
                                cholesterol values, you can still save this test result.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="accordion">
                            <AccordionSummary
                            className="accordionTitle"
                            expandIcon={<ExpandMore />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            >
                            How can I change my target values?
                            </AccordionSummary>
                            <hr />
                            <AccordionDetails className="accordionDetails">
                                To change your target values, follow these steps:
                                <br/><br/> 
                                1. Navigate to the sidebar and click on "Settings".
                                <br/>
                                2. Within the settings menu, you'll find an option to choose between target value categories: low, medium, high, 
                                and very high risk.
                                <br/>
                                3. Additionally, you can select your gender to set the appropriate HDL target value. If you choose not to add your 
                                gender, the HDL target value will be set to the middle value between the targets for women and men.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="accordion">
                            <AccordionSummary
                            className="accordionTitle"
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                            >
                                How do I know if I am at a low, medium, high, or very high risk?
                            </AccordionSummary>
                            <hr />
                            <AccordionDetails className="accordionDetails">
                                It's important to note that individual risk factors, such as age, gender, family history, smoking, 
                                and other health conditions, can influence your overall risk level. It's recommended to consult with a 
                                healthcare professional for personalized assessment and guidance based on your specific health profile.
                                <br/><br/>
                                If you're seeking a rough estimation of your category, you could consider the following:
                                <br/><br/>
                                1. <b>Low Risk</b>: If your total cholesterol, LDL cholesterol, HDL cholesterol, and triglyceride levels are within 
                                the optimal ranges, and you have no other major risk factors such as smoking, obesity, or a family history of 
                                heart disease, you might be at a low risk.
                                <br/><br/>
                                2. <b>Medium Risk</b>: If your cholesterol levels are slightly elevated but not excessively high, and you have 
                                some moderate risk factors, such as being overweight or having a family history of heart disease, you 
                                might fall into the medium-risk category.
                                <br/><br/>
                                3. <b>High Risk</b>: If your cholesterol levels are significantly elevated, especially if accompanied by other 
                                major risk factors such as smoking, high blood pressure, diabetes, or a family history of heart disease at a 
                                young age, you could be at high risk.
                                <br/><br/>
                                4. <b>Very High Risk</b>: If your cholesterol levels are extremely high, or if you have existing cardiovascular 
                                disease, diabetes, or other serious health conditions, you might be considered at very high risk.
                                <br/><br/>
                                However, it's important to emphasize that this is just a rough estimation and should not replace a comprehensive 
                                evaluation by a healthcare professional. Consulting with a doctor or a lipid specialist is crucial for accurate 
                                risk assessment and personalized management strategies. They can consider all relevant factors and provide 
                                tailored recommendations to help you manage your cholesterol levels and reduce your risk of cardiovascular disease.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="accordion">
                            <AccordionSummary
                            className="accordionTitle"
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                            >
                                Why the gender matters?
                            </AccordionSummary>
                            <hr />
                            <AccordionDetails className="accordionDetails">
                                Gender can impact HDL cholesterol levels because women tend to have higher levels of HDL cholesterol compared to 
                                men. This difference is partly attributed to hormonal influences, particularly estrogen, which tends to raise HDL 
                                levels. Therefore, considering gender helps provide a more accurate assessment of cardiovascular risk factors 
                                associated with cholesterol levels.
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;