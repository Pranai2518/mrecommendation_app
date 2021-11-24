import React, { useState, useEffect } from 'react'
import styles from './card.module.css'
import axios from 'axios'
import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import Image from 'next/image'

import { useSelector, useDispatch } from 'react-redux'
import { addMovieData, deleteMovieData } from '../../redux/features/userDataSlice'
// import { fetchMovies } from '../../redux/features/userDataSlice'
import { setOpen, setMovieId } from '../../redux/features/movieSlice'

const MCard = styled.div.attrs((props) => ({
    className: `m_card ${props.size}`
}))`
    ${props => props.size === 'large' && `
    --card-width:15rem;
    --card-height:22rem;
    `}
    ${props => props.size === 'medium' && `
    --card-width:12rem;
    --card-height:18rem;
    `}
    ${props => props.size === 'small' && `
    --card-width:10rem;
    --card-height:15rem;
    `}
`
export default function Card({ id, size }) {
    const [details, setDetais] = useState()
    const [loading, setLoading] = useState(true)
    const [inList, setInList] = useState()

    const dispatch = useDispatch()
    const uid = useSelector(state => state.currentUser.user.uid)
    const moviesInfo = useSelector(state => state.userData.myList)
    // const status = useSelector(state => state.userData.status)

    const [status, setStatus] = useState(false)
    const fix = async () => {
        const mIfo = await moviesInfo.find(i => i.movieId === details.imdbID)
        if (mIfo) { setInList(mIfo.myList) }
        else { setInList(false) }
        setStatus(false)
    }
    const fetchMovie = async (signal) => {
        setLoading(true)
        await axios.get(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&i=${id}`,
            { signal: signal },
            { headers: { 'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_URL}`, 'Access-Control-Allow-Credentials': true } })
            .then(data => {
                const res = data.data
                setDetais(res)
                setLoading(false)

            })
            .catch(err => { console.log(err) })


    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        // if (status === 'succeeded') {
        fetchMovie(signal)

        // }
        return () => { controller.abort() }
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (details?.imdbID) fix()
    }, [moviesInfo, details])//eslint-disable-line react-hooks/exhaustive-deps



    const handleAdd = () => {
        // setInList(!inList)
        // setTimeout(() => {
        //     setInList(!inList)
        // }, 200)
        setStatus(true)
        var obj = {
            uid: uid,
            movieId: details.imdbID,
            title: details.Title,
            rating: '',
            watched: false,
            myList: true,
        }
        // console.log(`added:${obj.title}`);
        dispatch(addMovieData(obj))

        // setTimeout(() => { fix() }, 1000)

    }
    const handleDelete = () => {
        setStatus(true)
        // setInList(!inList)
        // setTimeout(() => {
        //     setInList(!inList)
        // }, 200)
        // const mIfo = moviesInfo.find(i => i.movieId === id)
        // if (mIfo.rating === '' && !mIfo.watched) {
        // console.log(`deleted:${details.id}`);
        // console.log(`deleting:${details.Title}`);
        dispatch(deleteMovieData({ uid, mid: details.imdbID }))

        // setTimeout(() => { fix() }, 1000)
        // }
    }
    return (
        <MCard className={styles.m_card} size={size}>
            {!loading && details ? <>
                <div className={styles.image} onClick={() => { dispatch(setMovieId(details)); dispatch(setOpen(true)); }}>
                    <Image objectFit='cover' layout='fill' className={styles.poster} src={details.Poster} priority alt="name1" />
                </div>

                <div className={styles.top}>
                    <div className={styles.imdb}>{details.imdbRating}</div>
                    <div className={styles.options} >
                        {!status ? <>
                            {inList ?
                                <div className={styles.tooltip} onClick={handleDelete} data-title='added' ><img src='/assets/checkbox.png' alt="tick" /></div> :
                                <div className={styles.tooltip} onClick={handleAdd} data-title='add to list'><img src='/assets/plus-circle-thin.png' alt="add" /></div>}
                        </> : <div className={styles.spin}></div>}
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.title} id='card_title' >{details.Title}</div>
                    <div className={styles.more} id='card_more' >
                        <div className={styles.durt}>{details.Runtime}</div>
                        <span></span>
                        <div className={styles.rate}>{details.Rated}</div>
                        <span></span>
                        <div className={styles.year}>{details.Year}</div>
                    </div>
                </div>
                {/* <div className="details">View</div> */}
            </> : <Skeleton animation='wave' height='100%' />}
        </MCard>

    )
}
