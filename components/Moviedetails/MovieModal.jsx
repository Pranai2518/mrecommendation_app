import { Backdrop, Modal, Fade, Box } from '@mui/material';
import Movie from './Movie';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '../../redux/features/movieSlice';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90vh',
    width: '80vw',
    background: 'var(--font-secondary)',
    boxShadow: '0 0 5px var(--card-shadow)',
    borderRadius: '5px',
    border: 'none'

}

export default function MovieModal() {
    const dispatch = useDispatch()
    const open = useSelector(state => state.movie.open)
    const handleClose = () => dispatch(setOpen(false));
    const customBackdrop = () => {
        return (
            <Backdrop
                style={{ background: 'rgba(0,0,0,.7)' }}
                open={open}
                onClick={handleClose}
            ></Backdrop>
        )
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={customBackdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box style={boxStyle}>
                        <Movie />
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
