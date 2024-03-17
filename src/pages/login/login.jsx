// Import scss
import "./login.scss"

// MUI imports
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// Imports
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

// Main
const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = useState('1'); // for tabs
  
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext)
  
    const handleLogin = (e) => {
        e.preventDefault();
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            dispatch({type:"LOGIN", payload:user});
            navigate("/");
            })
            .catch((error) => {
                setError(true)
                console.error("Logout error:", error);
        });
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="login">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="API tabs">
                        <Tab label="Login" value="1" />
                        <Tab label="Sign up" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                        <button type="submit">Login</button>
                        {error && <span>Wrong email or password!</span>}
                    </form>
                </TabPanel>
                <TabPanel value="2">
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                        <button type="submit">Sign up</button>
                        {error && <span>Something went wrong!</span>}
                    </form>
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default Login;