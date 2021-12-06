import React, { useEffect, useState } from 'react'
import Carousel from '../carousel/Carousel'
import axios from 'axios'
import styles from './sections.module.css'
import { Loading } from '../loadings/Loading'
import MyList from './MyList'

export default function Sections() {
    return (
        <>
            <section className={styles.two}>
                <MyList />
                <Section name="top rated" />
                <Section name="action & Thriller" query={{ genres: ['Action', 'Thriller'] }} />
                <Section name="oscar winner" query={{ genres: ['Winner'] }} />
                <Section name="romance & drama" query={{ genres: ['Romance', 'Drama'] }} />
                <Section name="sci-fi" query={{ genres: ['Sci-Fi', 'Thriller'] }} />
                <Section name="oscar Nominee" query={{ genres: ['Nominee'] }} />
                <Section name="animation" query={{ genres: ['Animation'] }} />
                <Section name="horror" query={{ genres: ['Horror', 'Thriller'] }} />
            </section>
        </>
    )
}



export const Section = ({ name, query }) => {
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState()
    const fetchGenre = async (signal) => {
        const domain = process.env.NEXT_PUBLIC_MOVIE_SERVER
        if (name === 'top rated') {
            const url = `${domain}/movies/toprated/`
            await axios.get(url, { signal: signal })
                .then(res => { setResult(res.data.result); setLoading(false) })
                .catch(err => console.log(err))
        }
        else {
            const url = `${domain}/movies/genres/`
            await axios.post(url, { genre: query.genres }, { signal: signal })
                .then(res => { console.log(res.data); setResult(res.data[0].result); setLoading(false) })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        setLoading(true)
        fetchGenre(signal)
        return () => controller.abort()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps
    // list={result?.sort(() => .5 - Math.random())}
    return (

        <div className={styles.c_section}>
            <div className={styles.head}><div className={styles.name}>{name}</div></div>
            {!loading ?
                <Carousel list={result} /> :
                <div style={{ height: '20vh', display: 'grid', placeItems: 'center', alignItems: 'center' }} ><Loading /></div>}
        </div>
    )
}