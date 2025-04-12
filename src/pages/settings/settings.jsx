// Import scss
import "../pages.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Setting from "../../components/setting/setting";

// Main
const Settings = () => {
    return (
        <div className="page">
            <Sidebar className="sidebar" />
            <div className="pageContainer">
                <Setting />
            </div>
        </div>
    );
};

export default Settings;