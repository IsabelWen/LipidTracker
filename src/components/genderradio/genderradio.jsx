// Imports
import "./genderradio.scss"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";

// Main
const Genderradio = () => {
    const [data, setData] = useState([]);
    
    // Database access / dont need access, just need to push the choice "female/male/other" to setting component
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
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
};

export default Genderradio;