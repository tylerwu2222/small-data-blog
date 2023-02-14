import { useState, useContext, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CustomButton from '../CustomButton/CustomButton';

import { PlayerContext } from '../../Tools/NASHBoard/NASHBoard';

import TextField from '@mui/material/TextField';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InputDialog({
    buttonText = 'open dialog',
    dialogTitle = 'dialog title',
    descriptionText = 'type in the dialog',
    dialogLabel = 'Notes',
    className = className,
    // dialogText = '',
    handleChange = () => { },
    viewOnly = false,
    passedNotes = ''
}) {
    const {
        displayedPlayerNotes
    } = useContext(PlayerContext);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={className}>
            <CustomButton variant="contained" size="small" onClick={handleClickOpen} buttonText={buttonText}>
            </CustomButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ paddingBottom: 0 }}>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {descriptionText}
                    </DialogContentText>
                    <TextField
                        style={{ display: viewOnly ? 'none' : 'block' }}
                        id="outlined-multiline-flexible"
                        label={dialogLabel}
                        multiline
                        fullWidth
                        rows={4}
                        // maxRows={16}
                        value={viewOnly ? passedNotes : displayedPlayerNotes}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            const { value } = e.target;

                            if (e.key === 'Tab') {
                                e.preventDefault();

                                const cursorPosition = e.target.selectionStart;
                                const cursorEndPosition = e.target.selectionEnd;
                                const tab = '\t';

                                e.target.value =
                                    value.substring(0, cursorPosition) +
                                    tab +
                                    value.substring(cursorEndPosition);

                                // if you modify the value programmatically, the cursor is moved
                                // to the end of the value, we need to reset it to the correct
                                // position again
                                e.target.selectionStart = cursorPosition + 1;
                                e.target.selectionEnd = cursorPosition + 1;
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}