// Import scss
import "./results.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Resultstable from "../../components/resultstable/resultstable";
import Footer from "../../components/footer/footer";

// Main
const Results = () => {
    return (
        <>
            <div className="results">
                <Sidebar className="sidebar"/>
                <div className="resultsContainer">
                    <Resultstable />
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Results;