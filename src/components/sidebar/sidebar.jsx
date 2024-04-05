// Imports
import "./sidebar.scss"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getAuth, signOut } from "firebase/auth";

// Import Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// Main
const Sidebar = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const auth = getAuth();
    const [nav, setNav] = useState(window.innerWidth <= 1200 ? true : false)
    
    // Function to toggle sidebar
    const showNav = () => {
        setNav(!nav);
    }

    // Function to handle logout
    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            dispatch({ type: "LOGOUT" });
            navigate("/login");
        })
        .catch((error) => {
            console.error("Logout error:", error);
        });
    };

    return (
        <>
        <div className={nav ? "toggle collapse" : "toggle"}>
            <Link to="#">
                <MenuOutlinedIcon className="icon" onClick={showNav}/>
            </Link>
        </div>
        <div className={nav ? "sidebar collapse" : "sidebar"}>
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">LipidTracker</span>
                </Link>
                {window.innerWidth <= 1200 ?
                    <Link to="#">
                        <CloseOutlinedIcon className="close-icon" onClick={showNav}/>
                    </Link>
                : null}
            </div>
            <hr />
            <div className="center">
                <ul>
                    {/* Dashboard */}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    {/* Test Results */}
                    <Link to="/results" style={{ textDecoration: "none" }}>
                        <li>
                            <BiotechOutlinedIcon className="icon" />
                            <span>Test Results</span>
                        </li>
                    </Link>
                    {/* FAQ */}
                    <Link to="/faq" style={{ textDecoration: "none" }}>
                        <li>
                            <QuizOutlinedIcon className="icon" />
                            <span>FAQ</span>
                        </li>
                    </Link>
                    {/* Settings */}
                    <Link to="/settings" style={{ textDecoration: "none" }}>
                        <li>
                            <SettingsApplicationsIcon className="icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                    {/* Logout */}
                    <Link onClick={handleLogout} style={{ textDecoration: "none" }}>
                        <li>
                            <ExitToAppIcon className="icon" />
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
        </>
    );
};

export default Sidebar;