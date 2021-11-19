import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, getRecomendations } from '../../redux/features/movieSlice';
import styles from './samp.module.css'
import Carousel from '../carousel/Carousel';

export default function Movie() {
    const status = useSelector(state => state.movie.status)
    const info = useSelector(state => state.movie)
    const recommends = useSelector(state => state.movie.recommends)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRecomendations({ id: info.details.imdbID }))
    }, [info.details])
    return (
        <div className={styles.movie} style={{ color: 'var(--font-primary)' }}>
            <>
                {info ? <>
                    <div className={styles.mov_details}>
                        <img className={styles.main_img} src={info.details?.Poster} />
                        <div className={styles.movie_info}>
                            <div className={styles.genres}>
                                <p>{info.details.Genre}</p>
                            </div>
                            <h1>{info.details.Title}</h1>
                            <div className={styles.yr}>
                                <h3>{info.details.Year}</h3>
                                <p>{info.details.imdbRating}</p>
                            </div>
                            <p className={styles.desc}>{info.details.Plot}</p>
                        </div>
                        <div className={styles.icons}>
                            <i className="far fa-thumbs-up"></i>
                            <i className="far fa-thumbs-down"></i>
                            <i className="fas fa-eye-slash"></i>
                            <i className="far fa-bookmark"></i>
                        </div>
                    </div>
                    {status === 'succeeded' ?
                        <div className={styles.similar}>
                            <p>Similar Movies</p>
                            <Carousel list={recommends?.map(i => i.imdbId)} size='small' />
                        </div> : 'loading...'}

                    <button className={styles.cbtn} style={{ background: 'none', color: 'var(--font-primary)' }} onClick={() => dispatch(setOpen(false))}>
                        <i className="fas fa-times"></i></button>
                </> : <p> wait</p>}

            </>
        </div>


    )
}
