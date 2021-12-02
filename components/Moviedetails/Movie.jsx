import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, getRecomendations, getMovieInfo } from '../../redux/features/movieSlice';
import { updateMovieData, deleteMovieData, addMovieData } from '../../redux/features/userDataSlice'
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
                        <Actions mid={info.details.imdbID} />
                    </div>
                    {status === 'succeeded' ?
                        <div className={styles.more_section}>
                            <div className={styles.menus}>
                                <div onClick={() => setMenuToggle(!menuToggle)}
                                    className={styles.menu}
                                    style={{ opacity: menuToggle ? '.5' : '' }}>you may like this</div>

                                <div onClick={() => setMenuToggle(!menuToggle)}
                                    style={{ opacity: !menuToggle ? '.5' : '' }} className={styles.menu}
                                >cast & crew</div>
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

export function Actions({ mid }) {
    const status = useSelector(state => state.userData.status)
    const uid = useSelector(state => state.currentUser.user.uid)
    const movie = useSelector(state => state.movie)
    const more = useSelector(state => state.movie.more)
    const like = useSelector(state => state.movie.more.liked)
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(more)


    const handleToggle = async (e) => {
        var action = e.target.closest('button')
        var info = {}

        switch (action.id) {
            case 'like':
                console.log(like)
                let liked = 0
                if (more.liked !== 1) { liked = 1 }
                info.liked = liked
                break;

            case 'dislike':
                console.log(more.liked)
                let liked2 = 0
                if (more.liked !== -1) { liked2 = -1 }
                info.liked = liked2

                break;

            case 'unwatched':
                info.watched = true
                break;
            case 'watched':
                info.watched = false

                break;
            case 'myList': ''
                break;
            default: '';
        }
        if (action.id) dispatch(updateMovieData({ uid, mid, data: info }))
    }
    useEffect(() => {
        dispatch(getMovieInfo({ uid, mid }))
        const icons = document.querySelector('#a_icons')
        icons.addEventListener('click', handleToggle)
        return () => icons.removeEventListener('click', handleToggle)
    }, [])
    useEffect(() => {
        if (status === 'succeeded') {
            dispatch(getMovieInfo({ uid, mid }))
        }
    }, [status])
    useEffect(() => {
        if (more.status === 'succeeded') {
            setToggle(more)
        }
    }, [more.status])





    return (
        <div className={styles.icons} id='a_icons'  >
            {more.status === 'succeeded' ? <>
                <button className={styles.icon} id='like' style={{ opacity: more.liked === 1 ? '1' : '.5' }}>
                    <i className="far fa-thumbs-up"  ></i></button>
                <button className={styles.icon} id='dislike' style={{ opacity: more.liked === -1 ? '1' : '.5' }}>
                    <i className="far fa-thumbs-down"  ></i></button>
                {!more?.watched ?
                    <button className={styles.icon} id='unwatched' style={{ opacity: '.5' }}><i className="fas fa-eye-slash" ></i></button>
                    : <button className={styles.icon} id='watched'><i className="fas fa-eye" ></i></button>}
                <button className={styles.icon} id='myList' style={{ opacity: more?.myList ? '1' : '.5' }}>
                    <i className="fas fa-plus" ></i></button>
            </> : ''}


        </div>
    )
}
