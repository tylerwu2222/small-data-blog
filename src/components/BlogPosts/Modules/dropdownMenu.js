import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import Select from '@mui/material/Select';

const DropdownMenu = ({ label = "Dropdown Label", options = [1, 2, 3], color = "#999", maxWidth = 300, handleChange }) => {
    return (
        <>
            <Box sx={{ 
                'minWidth': 120, 
                'maxWidth': maxWidth,
                '&.MuiFormLabel-root ':{
                    color: color
                },
                '&.MuiNativeSelect-select ':{
                    borderColor: color
                } }}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        {label}
                    </InputLabel>
                    <NativeSelect
                        defaultValue={options[0]}
                        inputProps={{
                            name: label,
                            id: 'uncontrolled-native-' + label,
                        }}
                        onChange={handleChange}
                    >
                        {options.map(o => {
                            return <option value={o}>{o}</option>
                        })}
                    </NativeSelect>
                </FormControl>
            </Box>
        </>
    )
}

export default DropdownMenu;