// Imports
import "./target.scss"
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Tooltip from '@mui/material/Tooltip';

// Main
const Target = () => {
    const [latestData, setLatestData] = useState({
        hdl: null,
        ldl: null,
        triglycerides: null,
        cholesterol: null
    });
    const [targetData, setTargetData] = useState({});
    const {currentUser} = useContext(AuthContext)
    const user = currentUser;
    const userUID = user.uid;

    // Get the latest result Data
    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "results"), where("userID", "==", userUID)), (snapShot) => {
            let sortedData = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Filter out documents without a date
            sortedData = sortedData.filter(doc => doc.date);
            // Sort by date (descending)
            sortedData.sort((a, b) => new Date(a.date) - new Date(b.date)); 
            sortedData.reverse();

            for (const key of ["hdl", "ldl", "triglycerides", "cholesterol"]) {
                for (const docData of sortedData) {
                    if (docData[key] !== null && docData[key] !== undefined) {
                        latestData[key] = docData[key];
                        break; // Move to the next key after finding the latest data
                    }
                }
            }
            setLatestData(latestData);
        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub();
        };
    }, []);

    // Get the target field of user
    useEffect(() => {
        const userRef = collection(db, "users");
        const userDoc = doc(userRef, userUID);
        const unsub = onSnapshot(userDoc, (doc) => {
            if (doc.exists()) {
                setTargetData(doc.data().target);
            }
        }, (error) => {
            console.log(error);
        });
    
        return () => {
            unsub();
        };
    }, []);

    
    if (latestData.cholesterol == null) {
        latestData.cholesterol = 'No Data';
    }
    if (latestData.hdl == null) {
        latestData.hdl = 'No Data';
    }
    if (latestData.ldl == null) {
        latestData.ldl = 'No Data';
    }
    if (latestData.triglycerides == null) {
        latestData.triglycerides = 'No Data';
    }

    // function to calculate the percentage of reaching target for HDL
    const calcPercentageHDL = (target, latest) => {
        let percentage = 0;
        percentage = parseInt((latest*100)/target);

        return percentage;
    }

    // function for progress bar width for HDL
    const showWidthHDL = (target, latest) => {
        let Width = latest;
        let percentage = calcPercentageHDL(target, latest);
        if (latest >= target) {
            Width = "100%";
        } else {
            Width = percentage + "%";
        }
        
        return Width;
    }

    // function to calculate the percentage of reaching target for Cholesterol, LDL and Triglycerides
    const calcPercentage = (target, latest) => {
        let percentage = 0;
        percentage = parseInt((target * 100) / latest);

        return percentage;
    }

    // function for progress bar width for Cholesterol, LDL and Triglycerides
    const showWidth = (target, latest) => {
        let Width = latest;
        let percentage = calcPercentage(target, latest);
        if (latest <= target) {
            Width = "100%";
        } else {
            Width = percentage + "%";
        }

        return Width;
    }

    // function for progressbar color
    const showColor = (target, latest) => {
        let percentage = 0;
        if (latest === latestData.hdl) {
            percentage = calcPercentageHDL(target, latest)
        } else {
            percentage = calcPercentage(target, latest);
        }
        
        let ProgressColor = '#00796b';
        if (percentage >= 75) {
            ProgressColor = "linear-gradient(to right, rgba(170,12,12,1) 0%, rgba(230,87,34,1) 20%, rgba(213,182,10,1) 45%, rgba(0, 128, 64, 1) 80%)";
        } else if (percentage >= 50 ) {
            ProgressColor = "linear-gradient(to right, rgba(170,12,12,1) 0%, rgba(230,87,34,1) 25%, rgba(213,182,10,1) 60%)";
        } else if (percentage >= 25) {
            ProgressColor = "linear-gradient(to right, rgba(170,12,12,1) 0%, rgba(230,87,34,1) 50%)";
        } else if (percentage < 25) {
            ProgressColor = "linear-gradient(to right, rgba(170,12,12,1) 0%, rgba(230,87,34,1) 100%)";
        }

        return ProgressColor;
    }

    // function for progressbar color
    const showMessage = (target, latest) => {
        let percentage = 0;
        if (latest === latestData.hdl) {
            percentage = calcPercentageHDL(target, latest)
        } else {
            percentage = calcPercentage(target, latest);
        }

        let Message = 'No Data';
        if (percentage >= 100) {
            Message = "Goal reached!";
        } else if (percentage >= 75) {
            Message = "Excellent progress!";
        } else if (percentage >= 50) {
            Message = "Good progress!";
        } else if (percentage >= 25) {
            Message = "Keep trying!";
        } else if (percentage < 25) {
            Message = "Careful!";
        }

        return Message;
    }

    return (
        <div className="target">
            <div className="top">
                <h1 className="title">Target</h1>
            </div>
            <hr/>
            <div className="bottom">

                <p><b>Cholesterol</b>(mg/dL):</p>
                <Tooltip  placement="top-end" title={<>Target {targetData?.cholesterol} | Current {latestData?.cholesterol}</>}>
                    <div className="progressbar">
                        <div className="progress" 
                            style={{
                                width: showWidth(targetData?.cholesterol, latestData.cholesterol), 
                                background: showColor(targetData?.cholesterol, latestData.cholesterol)
                            }}>
                                {showMessage(targetData?.cholesterol, latestData.cholesterol)}
                        </div>
                    </div>
                </Tooltip>

                <p><b>HDL-Cholesterol</b>(mg/dL):</p>
                <Tooltip  placement="top-end" title={<>Target {targetData?.hdl} | Current {latestData.hdl}</>}>
                    <div className="progressbar">
                        <div className="progress" 
                            style={{
                                width: showWidthHDL(targetData?.hdl, latestData.hdl), 
                                background: showColor(targetData?.hdl, latestData.hdl)
                            }}>
                                {showMessage(targetData?.hdl, latestData.hdl)}
                        </div>
                    </div>
                </Tooltip>
                

                <p><b>LDL-Cholesterol</b>(mg/dL):</p>
                <Tooltip  placement="top-end" title={<>Target {targetData?.ldl} | Current {latestData.ldl}</>}>
                    <div className="progressbar">
                        <div className="progress" 
                            style={{
                                width: showWidth(targetData?.ldl, latestData.ldl), 
                                background: showColor(targetData?.ldl, latestData.ldl)
                            }}>
                                {showMessage(targetData?.ldl, latestData.ldl)}
                        </div>
                    </div>
                </Tooltip>
                
                <p><b>Triglycerides</b>(mg/dL):</p>
                <Tooltip  placement="top-end" title={<>Target {targetData?.triglycerides} | Current {latestData.triglycerides}</>}>
                    <div className="progressbar">
                        <div className="progress" 
                            style={{
                                width: showWidth(targetData?.triglycerides, latestData.triglycerides), 
                                background: showColor(targetData?.triglycerides, latestData.triglycerides)
                            }}>
                                {showMessage(targetData?.triglycerides, latestData.triglycerides)}
                        </div>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};

export default Target;