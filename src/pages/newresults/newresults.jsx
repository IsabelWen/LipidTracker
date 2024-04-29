// Import scss
import "./newresults.scss";

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";

// Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";

// Main
const Newresults = ({ inputs }) => {
    const [data, setData] = useState("");
    const navigate = useNavigate();
    const user = auth.currentUser;
    const userUID = user ? user.uid : null; 
    
    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]:value})
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = {};

        for (const key in data) {
            if (data[key]) {
                formData[key] = data[key];
            }
        }

        // Add userUID to formData
        formData.userID = userUID;

        try{
            await addDoc(collection(db, "results"), formData);
            navigate(-1);
        }catch(err){
            console.log(err);
        }
    };

    return (
        <>
        <div className="new">
            <Sidebar className="sidebar"/>
            <div className="newContainer">
                <div className="top">
                    <div className="title">Add New Test Result</div>
                </div>
                <div className="bottom">
                    <div className="buttomContainer">
                        <form onSubmit={handleAdd}>
                            {inputs.map((input) => (
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
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
};

export default Newresults;