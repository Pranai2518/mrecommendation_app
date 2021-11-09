import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '../../redux/features/movieSlice';

export default function Movie() {
    const info = useSelector(state => state.movie)
    const dispatch = useDispatch()

    return (
        <div className="movie" style={{ color: 'var(--font-primary)' }}>
            <h1>id:{info?.id?.t},{info?.id?.i}</h1>
            <button style={{ background: 'none', color: 'var(--font-primary)' }} onClick={() => dispatch(setOpen(false))}>
                <i className="fas fa-times"></i></button>
        </div>
    )
}
