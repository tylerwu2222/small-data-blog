import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    // color: theme.palette.getContrastText(purple[500]),
    color: '#000',
    backgroundColor: '#EFEFEF',
    '&:hover': {
        backgroundColor: '#E5E5E5',
    },
    border: 'black solid 1px',
    textTransform: 'none'
}));

export default function CustomButton({theme='',buttonText='',onClick=()=>{}}) {
    return <ColorButton theme={theme} onClick={onClick}>{buttonText}</ColorButton>
}
