// Import scss
import "./newresults.scss";

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

// Main
const Newresults = ({ inputs }) => {
    const [data, setData] = useState("");
    const navigate = useNavigate();

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

        try{
            await addDoc(collection(db, "results"), formData);
            navigate(-1);
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <div className="top">
                    <div className="title">Add New Test Result</div>
                </div>
                <div className="bottom">
                    <div className="buttomContainer">
                        <form onSubmit={handleAdd}>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input id={input.id} 
                                    type={input.type} 
                                    placeholder={input.placeholder} 
                                    max={input.max}
                                    maxlength={input.maxlength}
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
    );
};

export default Newresults;