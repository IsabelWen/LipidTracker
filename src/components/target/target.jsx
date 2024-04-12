// Imports
import "./target.scss"
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

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
    const calcPercentageHDL = (Target, Latest) => {
        let Percentage = 0;
        Percentage = parseInt((Latest*100)/Target);

        return Percentage;
    }

    // function for progress bar width for HDL
    const showWidthHDL = (Target, Latest) => {
        let Width = Latest;
        let Percentage = calcPercentageHDL(Target, Latest);
        if (Latest >= Target) {
            Width = "100%";
        } else {
            Width = Percentage + "%";
        }
        
        return Width;
    }

    // function to calculate the percentage of reaching target for Cholesterol, LDL and Triglycerides
    const calcPercentage = (Target, Latest) => {
        let Percentage = 0;
        Percentage = parseInt((Target * 100) / Latest);

        return Percentage;
    }

    // function for progress bar width for Cholesterol, LDL and Triglycerides
    const showWidth = (Target, Latest) => {
        let Width = Latest;
        let Percentage = calcPercentage(Target, Latest);
        if (Latest <= Target) {
            Width = "100%";
        } else {
            Width = Percentage + "%";
        }

        return Width;
    }

    // function for progressbar color
    const showColor = (Target, Latest) => {
        let Percentage = 0;
        if (Latest === latestData.hdl) {
            Percentage = calcPercentageHDL(Target, Latest)
        } else {
            Percentage = calcPercentage(Target, Latest);
        }
        
        let ProgressColor = '#00796b';
        if (Percentage >= 75) {
            ProgressColor = "#228B22";
        } else if (Percentage >= 50 ) {
            ProgressColor = "#D5B60A";
        } else if (Percentage >= 25) {
            ProgressColor = "#ff8c00";
        } else if (Percentage < 25) {
            ProgressColor = "#AA0C0C";
        }

        return ProgressColor;
    }

    return (
        <div className="target">
            <div className="top">
                <h1 className="title">Target</h1>
            </div>
            <hr/>
            <div className="bottom">
                <p><b>Cholesterol</b>(mg/dL): Target {targetData?.cholesterol} | Current {latestData.cholesterol}</p>
                <div className="progressbar">
                    <div className="progress" 
                        style={{
                            width: showWidth(targetData?.cholesterol, latestData.cholesterol), 
                            backgroundColor: showColor(targetData?.cholesterol, latestData.cholesterol)
                        }}>
                            {showWidth(targetData?.cholesterol, latestData.cholesterol)}
                    </div>
                </div>
                <p><b>HDL-Cholesterol</b>(mg/dL): Target {targetData?.hdl} | Current {latestData.hdl}</p>
                <div className="progressbar">
                    <div className="progress" 
                        style={{
                            width: showWidthHDL(targetData?.hdl, latestData.hdl), 
                            backgroundColor: showColor(targetData?.hdl, latestData.hdl)
                        }}>
                            {showWidthHDL(targetData?.hdl, latestData.hdl)}
                    </div>
                </div>
                <p><b>LDL-Cholesterol</b>(mg/dL): Target {targetData?.ldl} | Current {latestData.ldl}</p>
                <div className="progressbar">
                    <div className="progress" 
                        style={{
                            width: showWidth(targetData?.ldl, latestData.ldl), 
                            backgroundColor: showColor(targetData?.ldl, latestData.ldl)
                        }}>
                            {showWidth(targetData?.ldl, latestData.ldl)}
                    </div>
                </div>
                <p><b>Triglycerides</b>(mg/dL): Target {targetData?.triglycerides} | Current {latestData.triglycerides}</p>
                <div className="progressbar">
                    <div className="progress" 
                        style={{
                            width: showWidth(targetData?.triglycerides, latestData.triglycerides), 
                            backgroundColor: showColor(targetData?.triglycerides, latestData.triglycerides)
                        }}>
                            {showWidth(targetData?.triglycerides, latestData.triglycerides)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Target;