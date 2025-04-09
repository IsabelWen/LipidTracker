// Import scss
import "./converter.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Calculator from "../../components/calculator/calculator";

// Main
const Converter = () => {
    return (
        <div className="converter">
            <Sidebar className="sidebar" />
            <div className="converterContainer">
                <Calculator />
            </div>
        </div>
    );
};

export default Converter;