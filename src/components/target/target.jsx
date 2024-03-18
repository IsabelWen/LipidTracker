// Imports
import "./target.scss"
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const Target = () => {
    const [latestData, setLatestData] = useState({});
    const user = auth.currentUser;
    const userUID = user.uid;

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "results"), where("userID", "==", userUID)), (snapShot) => {
            let sortedData = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Filter out documents without a date
            sortedData = sortedData.filter(doc => doc.date);
            // Sort by date (descending)
            sortedData.sort((a, b) => new Date(a.date) - new Date(b.date)); 

            let latestData = {};
            for (const key of ["hdl", "ldl", "triglycerides", "cholesterol"]) {
                for (const docData of sortedData.reverse()) {
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

    console.log(latestData)

    // Cholesterol Width
    let CholesterolWidth = 0;
    if (latestData.cholesterol <= 190) {
        CholesterolWidth = "100%";
    } else {
        let CholesterolPercentage = parseInt((190*100)/(latestData.cholesterol));
        CholesterolWidth = CholesterolPercentage + "%";
    }

    // HDL width
    let HDLWidth = 0;
    if (latestData.hdl >= 45) {
        HDLWidth = "100%"
    } else {
        let HDLPercentage = parseInt((latestData.hdl*100)/45);
        HDLWidth = HDLPercentage + "%";
    }

    // LDL width
    let LDLWidth = latestData.ldl;
    if (LDLWidth <= 116) {
        LDLWidth = "100%"
    } else {
        let LDLPercentage = parseInt((116 * 100) / latestData.ldl);
        LDLWidth = LDLPercentage + "%";
    }

    // LDL width
    let TriglycerideWidth = latestData.triglycerides;
    if (TriglycerideWidth <= 150) {
        TriglycerideWidth = "100%";
    } else {
        let TriglyceridePercentage = parseInt((150 * 100) / latestData.triglycerides);
        TriglycerideWidth = TriglyceridePercentage + "%";
    }

    return (
        <div className="target">
            <div className="top">
                <h1 className="title">Target</h1>
            </div>
            <hr/>
            <div className="bottom">
                <p><b>Cholesterol</b>(mg/dL): Target 190 | Current {latestData.cholesterol}</p>
                <div className="progressbar">
                    <div className="progress" style={{width: CholesterolWidth}}>{CholesterolWidth}</div>
                </div>
                <p><b>HDL-Cholesterol</b>(mg/dL): Target 45 | Current {latestData.hdl}</p>
                <div className="progressbar">
                    <div className="progress" style={{width: HDLWidth}}>{HDLWidth}</div>
                </div>
                <p><b>LDL-Cholesterol</b>(mg/dL): Target 116 | Current {latestData.ldl}</p>
                <div className="progressbar">
                    <div className="progress" style={{width: LDLWidth}}>{LDLWidth}</div>
                </div>
                <p><b>Triglycerides</b>(mg/dL): Target 150 | Current {latestData.triglycerides}</p>
                <div className="progressbar">
                    <div className="progress" style={{width: TriglycerideWidth}}>{TriglycerideWidth}</div>
                </div>
            </div>
        </div>
    );
};

export default Target;