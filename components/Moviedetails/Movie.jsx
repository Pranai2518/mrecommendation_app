import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, getRecomendations } from '../../redux/features/movieSlice';
import styles from './movie.module.css'
import Carousel from '../carousel/Carousel';
import { Loading } from '../loadings/Loading'

export default function Movie() {
    const status = useSelector(state => state.movie.status)
    const info = useSelector(state => state.movie)
    const recommends = useSelector(state => state.movie.recommends)
    const dispatch = useDispatch()
    const [menuToggle, setMenuToggle] = useState(false)
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
                                <p>Imdb: {info.details.imdbRating}</p>
                            </div>
                            <p className={styles.desc}>{info.details.Plot}</p>
                            {/* <div className={styles.actors}>Actors: {info.details.Actors}</div>
                            <div className={styles.actors}>Director(s): {info.details.Director}</div> */}
                        </div>
                        <div className={styles.icons}>
                            <i style={{ opacity: menuToggle ? '.5' : '' }} className="far fa-thumbs-up"></i>
                            <i style={{ opacity: menuToggle ? '.5' : '' }} className="far fa-thumbs-down"></i>
                            {!menuToggle ?
                                <i style={{ opacity: !menuToggle ? '.5' : '' }} className="fas fa-eye-slash"></i> :
                                <i style={{ opacity: !menuToggle ? '.5' : '' }} className="fas fa-eye"></i>}
                            <i style={{ opacity: menuToggle ? '.5' : '' }} className="far fa-bookmark"></i>
                        </div>
                    </div>
                    {status === 'succeeded' ?
                        <div className={styles.more_section}>
                            <div className={styles.menus}>
                                <div onClick={() => setMenuToggle(!menuToggle)}
                                    className={styles.menu}
                                    style={{ opacity: menuToggle ? '.5' : '' }}>you may like this</div>

                                <div onClick={() => setMenuToggle(!menuToggle)} className={styles.menu}
                                    style={{ opacity: !menuToggle ? '.5' : '' }}>cast & crew</div>
                            </div>
                            <div className={styles.selected_content}>
                                {!menuToggle ?
                                    <Carousel className={styles.carousel1} list={recommends?.map(i => i.imdbId)} size='small' /> : ''}
                            </div>
                        </div> : <div style={{ marginTop: '5%', display: 'grid', placeItems: 'center' }} ><Loading /></div>}

                    <button className={styles.cbtn} style={{ background: 'none', color: 'var(--font-primary)' }} onClick={() => dispatch(setOpen(false))}>
                        <i className="fas fa-times"></i></button>
                </> : <p> wait</p>}

            </>
        </div>


    )
}
