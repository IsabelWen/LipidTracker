// Import scss & component
import "./login.scss"

// MUI imports
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Imports
import { useContext, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Impressum from "../../files/Impressum.pdf";
import Datenschutzerklärung from "../../files/Datenschutzerklärung.pdf";

// Main
const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [agreement, setAgreement] = useState(false);
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

        if (agreement===false) {
            setError(true);
            alert("User must agree to the privacy policy.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password, agreement)
        .then((userCredential) => {
            const user = userCredential.user;
            
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                agreement: agreement,
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
                        <Tooltip placement="bottom" title="Note: This can be a fake email address. No validation email will be sent." arrow>
                            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        </Tooltip>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <FormControlLabel 
                            control={<Checkbox 
                                sx={{
                                '&.Mui-checked': {
                                  color: '#00796b',
                                },
                              }}
                            />}
                            label={
                                <p>I have read and agree to the website's&nbsp;
                                <a style={{color: "red", fontWeight: "bold"}} 
                                href={Datenschutzerklärung} rel="noopener noreferrer" target="_blank">
                                privacy policy</a>.*</p>
                            }
                            sx={{
                                maxWidth: "250px",
                                paddingBottom: "10px",
                                '&.MuiTypography-root': {
                                    fontSize: "12px",
                                  }
                            }}
                            value={agreement}
                            onChange={(event) => setAgreement(!agreement)}
                        />
                        <button type="submit">Sign up</button>
                        {error && <span>Something went wrong!</span>}
                    </form>
                </TabPanel>
            </TabContext>
            <a className="impressum" href={Impressum} rel="noreferrer" target="_blank">Impressum</a>
        </div>
    );
};

export default Login;