// Import scss
import "./update.scss";

// Imports
import { useState, useEffect } from "react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { resultsInputs } from "../../formSource";

// Main
const Update = ({ id, handleClose }) => {
    const [data, setData] = useState("");
    const user = auth.currentUser;
    const userUID = user ? user.uid : null; 
    
    // Fetch data for selected row
    useEffect(() => {
        if (id) {
        const docRef = doc(db, "results", id);
        const unsub = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
            setData({
                date: doc.data().date,
                cholesterol: doc.data().cholesterol,
                hdl: doc.data().hdl,
                ldl: doc.data().ldl,
                triglycerides: doc.data().triglycerides,
                note: doc.data().note,
            });
            }
        });

        return () => unsub();
        }
    }, [id]);
  
    // Handle form input
    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
    
        setData({ ...data, [id]: value });
    };
    
    // Handle results updates
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = {};
    
        for (const key in data) {
            if (data[key]) {
                formData[key] = data[key];
            }
        }
    
        // Add userUID to formData
        formData.userID = userUID;
    
        try {
            await updateDoc(doc(db, "results", id), formData);
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <div className="title">Update Test Result</div>
                </div>
                <div className="bottom">
                    <div className="buttomContainer">
                        <form onSubmit={handleUpdate}>
                            {resultsInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>
                                        {input.label}
                                        <small>{input.unitLabel}</small>
                                    </label>
                                    <input id={input.id} 
                                    type={input.type} 
                                    placeholder={input.placeholder} 
                                    min={input.min}
                                    max={input.max}
                                    maxLength={input.maxLength}
                                    step={input.step}
                                    required={input.required}
                                    onChange={handleInput}/>
                                </div>
                            ))}
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;