// Import scss
import "./settings.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";

// Main
const Settings = () => {
    return (
        <div className="settings">
            <Sidebar />
            <div className="settingsContainer">
                Setting
            </div>
        </div>
    );
};

export default Settings;