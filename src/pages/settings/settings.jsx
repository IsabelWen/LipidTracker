// Import scss
import "./settings.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Setting from "../../components/setting/setting";

// Main
const Settings = () => {
    return (
        <div className="settings">
            <Sidebar className="sidebar"/>
            <div className="settingsContainer">
                <Setting/>
            </div>
        </div>
    );
};

export default Settings;