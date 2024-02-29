// Import scss
import "./newresults.scss";

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Main
const Newresults = () => {
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <div className="top">
                    <h1>Title</h1>
                </div>
                <div className="buttom">
                    <div className="right">
                        <form>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newresults;