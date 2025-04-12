// Import scss
import "../pages.scss";

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Calculator from "../../components/calculator/calculator";

// Main
const Converter = () => {
    return (
        <div className="page">
            <Sidebar className="sidebar" />
            <div className="pageContainer">
                <Calculator />
            </div>
        </div>
    );
};

export default Converter;