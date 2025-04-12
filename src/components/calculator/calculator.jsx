// Imports
import "./calculator.scss"
import { useState } from "react";

const Calculator = () => {
    const [lipid, setLipid] = useState("cholestrol");
    const [unit, setUnit] = useState("mg/dl");
    const [value, setValue] = useState(0);
    const [result, setResult] = useState(null);

    // Convert value
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (value) {
            let convertedValue = null;
            let i = lipid === 'triglycerides' ? 88.57 : 38.67;
            
            // Convert from mg/dl to mmol/l
            if (unit === "mg/dl") {
                convertedValue = (parseFloat(value) / i).toFixed(2);
                    
            // Convert from mmol/l to mg/dl
            } else if (unit === "mmol/l") {
                convertedValue = (parseFloat(value) * i).toFixed(2);
            }

            setResult(convertedValue);
        }
    };

    return (
        <div className="content">
            <div className="title">
                Converter
            </div>
            <div className="calculatorContainer">
                <form onSubmit={handleUpdate}>
                    <div className="formInput" key="lipid">
                        <label>
                            Blood Fat
                        </label>
                        <select
                            id="lipid"
                            onChange={(e) => setLipid(e.target.value)}
                        >
                            <option value="cholestrol">Cholestrol</option>
                            <option value="triglycerides">Triglycerides</option>
                        </select>
                    </div>
                    <div className="formInput" key="measuring-unit">
                        <label>
                            Measuring Unit
                        </label>
                        <select
                            id="measuring-unit"
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <option value="mg/dl">mg/dl</option>
                            <option value="mmol/l">mmol/l</option>
                        </select>
                    </div>
                    <div className="formInput" key="input2">
                        <label>
                            Value
                        </label>
                        <input id="value"
                            type="number"
                            min="0"
                            max="1500"
                            step="0.1"
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <button type="submit">Convert</button>
                </form>

                {result !== null && (
                    <div className="result">
                        <h3>Converted Value:</h3>
                        <p>{result} {unit === "mg/dl" ? "mmol/l" : "mg/dl"}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Calculator;