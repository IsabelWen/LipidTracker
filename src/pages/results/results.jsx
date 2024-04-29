// Import scss
import "./results.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Resultstable from "../../components/resultstable/resultstable";

// Main
const Results = () => {
    return (
        <div className="results">
            <Sidebar className="sidebar" />
            <div className="resultsContainer">
                <Resultstable />
            </div>
        </div>
    );
};

export default Results;