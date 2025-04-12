// Imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

// Main
const Riskselect = () => {
    const [data, setData] = useState([]);
    const [risk, setRisk] = useState('');
    const {currentUser} = useContext(AuthContext)
    const user = currentUser;
    const userUID = user ? user.uid : null; 

    // Database access to show Risk Levels
    useEffect(() => {
      const unsub = onSnapshot(collection(db, "targets"), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        }, (error) => {
          console.log(error);
        }
      );
      
      return () => {
        unsub();
      };
    }, []);
    
    // Select Risk Level
    const handleChange = (event) => {
      const usersCol = collection(db, "users");
      const userDoc = doc(usersCol, userUID);
      setRisk(event.target.value);
      updateDoc(userDoc, {
        riskLevel: event.target.value,
      }).then(() => {
        console.log("Document successfully updated!");
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <InputLabel id="simple-select-label">Level</InputLabel>
            
                <Select
                labelId="simple-select-label"
                id="simple-select"
                value={risk}
                label="Risk"
                onChange={handleChange}
            >
                {data
                    .filter((item) => item.gender === "female")
                    .map((item) => (
                        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                    ))
                }
            </Select>
            </FormControl>
        </Box>
    );
};

export default Riskselect;