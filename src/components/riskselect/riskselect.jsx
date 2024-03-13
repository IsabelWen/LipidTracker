// Imports
import "./riskselect.scss"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const Riskselect = () => {
    const [data, setData] = useState([]);
    const [risk, setRisk] = useState('');
    
    // Select Risk
    const handleChange = (event) => {
        setRisk(event.target.value);
    };

    // Database access
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

    

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={risk}
                label="Risk"
                onChange={handleChange}
            >
                {data
                    .filter((item) => item.gender === "female")
                    .map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                }
            </Select>
            </FormControl>
        </Box>
    );
};

export default Riskselect;