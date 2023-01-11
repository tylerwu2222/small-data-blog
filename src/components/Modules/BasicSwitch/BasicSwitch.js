import { Switch, FormControlLabel } from '@mui/material';

export default function BasicSwitch({ label, color = 'default', isDefaultChecked = false, onChange = () => { } }) {
  // const label = { inputProps: { 'aria-label': 'Basic switch' } };
  return (
    <span>
      <FormControlLabel control={<Switch color={color} />} label={label} labelPlacement="start" onChange={onChange} />

    </span>
  );
}