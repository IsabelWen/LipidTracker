// Imports
import "./target.scss"

// Main
const Target = () => {

    return (
        <div className="target">
            <div className="top">
                <h1 className="title">Target</h1>
            </div>
            <hr/>
            <div className="bottom">
                <p><b>Cholesterol Target:</b> Number</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "78%"}}>160 | 80%</div>
                </div>
                <p><b>HDL-Cholesterol Target:</b> Number</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "90%"}}>160 | 90%</div>
                </div>
                <p><b>LDL-Cholesterol Target:</b> Number</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "65%"}}>160 | 65%</div>
                </div>
                <p><b>Triglyceride Target:</b> Number</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "78%"}}>160 | 78%</div>
                </div>
            </div>
        </div>
    );
};

export default Target;