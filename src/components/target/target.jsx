// Imports
import "./target.scss"
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { db, auth } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const Target = () => {
    const [latestData, setLatestData] = useState({
        hdl: null,
        ldl: null,
        triglycerides: null,
        cholesterol: null
    });
    const [targetData, setTargetData] = useState({});
    const user = auth.currentUser;
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

    // Cholesterol Width
    let CholesterolWidth = 0;
    if (latestData.cholesterol <= targetData?.cholesterol) {
        CholesterolWidth = "100%";
    } else {
        let CholesterolPercentage = parseInt((targetData?.cholesterol*100)/(latestData.cholesterol));
        CholesterolWidth = CholesterolPercentage + "%";
    }

    // HDL width
    let HDLWidth = 0;
    if (latestData.hdl >= targetData?.hdl) {
        HDLWidth = "100%"
    } else {
        let HDLPercentage = parseInt((latestData.hdl*100)/targetData?.hdl);
        HDLWidth = HDLPercentage + "%";
    }

    // LDL width
    let LDLWidth = latestData.ldl;
    if (LDLWidth <= targetData?.ldl) {
        LDLWidth = "100%"
    } else {
        let LDLPercentage = parseInt((targetData?.ldl * 100) / latestData.ldl);
        LDLWidth = LDLPercentage + "%";
    }

    // LDL width
    let TriglycerideWidth = latestData.triglycerides;
    if (TriglycerideWidth <= targetData?.triglycerides) {
        TriglycerideWidth = "100%";
    } else {
        let TriglyceridePercentage = parseInt((targetData?.triglycerides * 100) / latestData.triglycerides);
        TriglycerideWidth = TriglyceridePercentage + "%";
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
                    <div className="progress" style={{width: CholesterolWidth}}>{CholesterolWidth}</div>
                </div>
                <p><b>HDL-Cholesterol</b>(mg/dL): Target {targetData?.hdl} | Current {latestData.hdl}</p>
                <div className="progressbar">
                    <div className="progress" style={{width: HDLWidth}}>{HDLWidth}</div>
                </div>
                <p><b>LDL-Cholesterol</b>(mg/dL): Target {targetData?.ldl} | Current {latestData.ldl}</p>
                <div className="progressbar">
                    <div className="progress" style={{width: LDLWidth}}>{LDLWidth}</div>
                </div>
                <p><b>Triglycerides</b>(mg/dL): Target {targetData?.triglycerides} | Current {latestData.triglycerides}</p>
                <div className="progressbar">
                    <div className="progress" style={{width: TriglycerideWidth}}>{TriglycerideWidth}</div>
                </div>
            </div>
        </div>
    );
};

export default Target;