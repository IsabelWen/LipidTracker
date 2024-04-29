// Import scss
import "./settings.scss"

// Import components
import Sidebar from "../../components/sidebar/sidebar";
import Setting from "../../components/setting/setting";
import Footer from "../../components/footer/footer";

// Main
const Settings = () => {
    return (
        <>
            <div className="settings">
                <Sidebar className="sidebar"/>
                <div className="settingsContainer">
                    <Setting/>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Settings;