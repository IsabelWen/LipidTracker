// Import scss
import "../pages.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Resultstable from "../../components/resultstable/resultstable";

// Main
const Results = () => {
    return (
        <div className="page">
            <Sidebar className="sidebar" />
            <div className="pageContainer">
                <Resultstable />
            </div>
        </div>
    );
};

export default Results;