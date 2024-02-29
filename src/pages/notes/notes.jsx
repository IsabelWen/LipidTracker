// Import scss
import "./notes.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Main
const Notes = () => {
    return (
        <div className="notes">
            <Sidebar />
            <div className="notesContainer">
                Notes
            </div>
        </div>
    );
};

export default Notes;