// Import scss
import "./results.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Main
const Results = () => {
    return (
        <div className="results">
            <Sidebar />
            <div className="resultsContainer">
                Results
            </div>
        </div>
    );
};

export default Results;