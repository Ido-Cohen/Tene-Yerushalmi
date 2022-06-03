import React, {useState} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const Dropdown = (props) => {
    const {type,values,reference} = props;
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        if (reference)
            reference(event.target.value);
    };
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{type}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={type}
                    onChange={handleChange}
                >
                    {values.map((num) => {
                        return (
                            <MenuItem value={num.value} style={{justifyContent: "right"}} key={num.value}>{num.label}</MenuItem>)
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Dropdown;
