// Imports
import "./target.scss"

// Main
const Target = () => {

    return (
        <div className="target">
            <div className="top">
                <h1 className="title">Target</h1>
            </div>
            <hr />
            <div className="bottom">
                <p>Cholesterol</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "78%"}}>80%</div>
                </div>
                <p>HDL-Cholesterol</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "90%"}}>90%</div>
                </div>
                <p>LDL-Cholesterol</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "65%"}}>65%</div>
                </div>
                <p>Triglyceride</p>
                <div className="progressbar">
                    <div className="progress" style={{width: "78%"}}>78%</div>
                </div>
            </div>
        </div>
    );
};

export default Target;