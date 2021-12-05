import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, getRecomendations, getMovieInfo } from '../../redux/features/movieSlice';
import { updateMovieData, deleteMovieData, addMovieData, fetchMovies } from '../../redux/features/userDataSlice'
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
    const movies_status = useSelector(state => state.userData.status)
    const allmovies = useSelector(state => state.userData.movies)
    const uid = useSelector(state => state.currentUser.user.uid)

    const [load, setLoad] = useState({ l1: false, l2: false, l3: false, l4: false })
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState()



    const handleLike = () => {
        setLoad({ ...load, l1: true })
        let a
        if (toggle.liked === 1) { a = 0 }
        else { a = 1 }
        const mIfo = allmovies.find(i => i.movieId === mid)
        if (!mIfo) dispatch(addMovieData({ ...toggle, movieId: mid, uid: uid, liked: a }))
        else if (mIfo.liked === 1 && !mIfo.watched && mIfo.myList === false) dispatch(deleteMovieData({ uid, mid }))
        else dispatch(updateMovieData({ uid, mid, data: { liked: a } }))
    }
    const handleDisLike = () => {
        setLoad({ ...load, l2: true })
        let a
        if (toggle.liked === -1) { a = 0 }
        else { a = -1 }
        const mIfo = allmovies.find(i => i.movieId === mid)
        if (!mIfo) dispatch(addMovieData({ ...toggle, movieId: mid, uid: uid, liked: a }))
        else if (mIfo.liked === -1 && !mIfo.watched && mIfo.myList === false) dispatch(deleteMovieData({ uid, mid }))
        else dispatch(updateMovieData({ uid, mid, data: { liked: a } }))
    }
    const handleWatched = () => {
        setLoad({ ...load, l3: true })
        const mIfo = allmovies.find(i => i.movieId === mid)
        if (!mIfo) dispatch(addMovieData({ ...toggle, movieId: mid, uid: uid, watched: !toggle.watched }))
        else if (mIfo.liked === 0 && mIfo.watched && mIfo.myList === false) dispatch(deleteMovieData({ uid, mid }))
        else dispatch(updateMovieData({ uid, mid, data: { watched: !toggle.watched } }))

    }
    const handleAddToList = () => {
        setLoad({ ...load, l4: true })
        const mIfo = allmovies.find(i => i.movieId === mid)
        if (!mIfo) dispatch(addMovieData({ ...toggle, movieId: mid, uid: uid, myList: true }))

        else if (mIfo.myList === false) dispatch(updateMovieData({ uid, mid, data: { ...toggle, myList: true } }))
        else if (mIfo.liked === 0 && !mIfo.watched && mIfo.myList === true) dispatch(deleteMovieData({ uid, mid }))
        else dispatch(updateMovieData({ uid, mid, data: { ...toggle, myList: false } }))
    }
    useEffect(() => {
        dispatch(fetchMovies(uid))
    }, [])

    useEffect(() => {
        if (movies_status === 'loaded') {
            const movie = allmovies.find(i => i.movieId === mid)
            if (movie) {
                setToggle(movie)
            } else {
                const obj = {
                    liked: 0,
                    watched: false,
                    myList: false
                }
                setToggle(obj)
            }
            setLoad({ l1: false, l2: false, l3: false, l4: false })
        }
    }, [movies_status])





    return (
        <div className={styles.actions}>
            <div className={styles.icons}  >
                {toggle ?
                    <>
                        {!load.l1 ?
                            <>
                                {toggle.liked === 1 ?
                                    <button data-src='liked' onClick={handleLike} className={styles.icon} id='like' style={{ opacity: toggle.liked === 1 ? '1' : '' }}>
                                        <i className="fas fa-thumbs-up"  ></i></button> :
                                    <button data-src='like it' onClick={handleLike} className={styles.icon} id='like' style={{ opacity: toggle.liked === 1 ? '1' : '' }}>
                                        <i className="far fa-thumbs-up"  ></i></button>
                                }</> : <BtnLoad />}

                        {!load.l2 ?
                            <>
                                {toggle.liked === -1 ?
                                    <button data-src='disliked' onClick={handleDisLike} className={styles.icon} id='dislike' style={{ opacity: toggle.liked === -1 ? '1' : '' }}>
                                        <i className="fas fa-thumbs-down"  ></i></button> :
                                    <button data-src='dislike it' onClick={handleDisLike} className={styles.icon} id='dislike' style={{ opacity: toggle.liked === -1 ? '1' : '' }}>
                                        <i className="far fa-thumbs-down"  ></i></button>
                                }</> : <BtnLoad />}

                        {!load.l3 ?
                            <>
                                {!toggle.watched ?
                                    <button data-src='watched ?' onClick={handleWatched} className={styles.icon} id='unwatched' >
                                        <i className="fas fa-eye-slash" ></i></button>
                                    : <button data-src='watched' onClick={handleWatched} className={styles.icon} id='watched'>
                                        <i className="fas fa-eye" ></i></button>}</> : <BtnLoad />}

                        {!load.l4 ?
                            <>
                                {!toggle.myList ?
                                    <button data-src='add to list' onClick={handleAddToList} className={styles.icon} id='myList'  >
                                        <i className="fas fa-plus" ></i></button> :
                                    <button data-src='remove from list' onClick={handleAddToList} className={styles.icon} id='myList'  >
                                        <i className="far fa-times-circle"></i></button>
                                }</> : <BtnLoad />}

                    </> : ''}
            </div>
        </div>
    )
}

export function BtnLoad() {
    return (
        <div className={styles.btnloader}>
            <span></span>
        </div>
    )
}
