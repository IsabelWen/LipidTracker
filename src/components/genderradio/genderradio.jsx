// Imports
import "./genderradio.scss"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { collection, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase"
import { useState } from "react";

// Main
const Genderradio = () => {
    const [data, setData] = useState('none');
    const user = auth.currentUser;
    const userUID = user ? user.uid : null; 

    const handleInput = (event) => {
        const usersCol = collection(db, "users");
        const userDoc = doc(usersCol, userUID);
        setData(event.target.value);
        updateDoc(userDoc, {
          gender: event.target.value,
        }).then(() => {
          console.log("Document successfully updated!");
        }).catch((error) => {
          console.error("Error updating document: ", error);
        });
    };

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleInput}
                value={data}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
};

export default Genderradio;