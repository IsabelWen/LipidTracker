// Imports
import "./target.scss"
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const Target = () => {
    const [latestData, setLatestData] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "results"), (snapShot) => {
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
                <p><b>Cholesterol Target:</b> 190</p>
                <div className="progressbar">
                    <div className="progress" style={{width: CholesterolWidth}}>{latestData.cholesterol} mg/dL | {CholesterolWidth}</div>
                </div>
                <p><b>HDL-Cholesterol Target:</b> 45</p>
                <div className="progressbar">
                    <div className="progress" style={{width: HDLWidth}}>{latestData.hdl} mg/dL | {HDLWidth}</div>
                </div>
                <p><b>LDL-Cholesterol Target:</b> 116</p>
                <div className="progressbar">
                    <div className="progress" style={{width: LDLWidth}}>{latestData.ldl} mg/dL | {LDLWidth}</div>
                </div>
                <p><b>Triglycerides Target:</b> 150</p>
                <div className="progressbar">
                    <div className="progress" style={{width: TriglycerideWidth}}>{latestData.triglycerides} mg/dL | {TriglycerideWidth}</div>
                </div>
            </div>
        </div>
    );
};

export default Target;