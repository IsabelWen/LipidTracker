// Import scss & component
import "./login.scss"

// MUI imports
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// Imports
import { useContext, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
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
  
    // Handles users login
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
                console.error("Login error:", error);
        });
    }

    // Handles users signup
    const handleSignup = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date()
            })
            .then(() => {
                alert("Signup was successful!")
                setValue('1');
            })
            .catch((error) => {
                setError(true)
                console.error("Error adding user to Firestore:", error)
            });
        })
        .catch((error) => {
            setError(true)
            console.error("Sign up error:", error);
        });
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="login">
            <h1>LipidTracker</h1><br /><br />
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="API tabs">
                        <Tab label="Login" value="1" />
                        <Tab label="Sign up" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                        {error && <span>Wrong email or password!</span>}
                    </form>
                </TabPanel>
                <TabPanel value="2">
                    <form onSubmit={handleSignup}>
                        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit">Sign up</button>
                        {error && <span>Something went wrong!</span>}
                    </form>
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default Login;