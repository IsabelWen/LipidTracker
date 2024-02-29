// Imports
import "./sidebar.scss"
import { Link } from "react-router-dom";

// Import Icons
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import StickyNote2Outlined from "@mui/icons-material/StickyNote2Outlined"
// import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

// Main
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">LipidTracker</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    {/* Dashboard */}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            {/*<DashboardIcon className="icon" />*/}
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    {/* Test Results */}
                    <Link to="/results" style={{ textDecoration: "none" }}>
                        <li>
                            {/*<BiotechOutlinedIcon className="icon" />*/}
                            <span>Test Results</span>
                        </li>
                    </Link>
                    {/* Notes */}
                    <Link to="/notes" style={{ textDecoration: "none" }}>
                        <li>
                            {/*<StickyNote2Outlined className="icon" />*/}
                            <span>Notes</span>
                        </li>
                    </Link>
                    {/* FAQ */}
                    <Link to="/faq" style={{ textDecoration: "none" }}>
                        <li>
                            {/*<QuizOutlinedIcon className="icon" />*/}
                            <span>FAQ</span>
                        </li>
                    </Link>
                    {/* Settings */}
                    <Link to="/settings" style={{ textDecoration: "none" }}>
                        <li>
                            {/*<SettingsApplicationsIcon className="icon" />*/}
                            <span>Settings</span>
                        </li>
                    </Link>
                    {/* Logout */}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            {/*<ExitToAppIcon className="icon" />*/}
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorMode"></div>
                <div className="colorMode"></div>
            </div>
        </div>
    );
};

export default Sidebar;