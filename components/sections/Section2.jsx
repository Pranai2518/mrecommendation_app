import React, { useEffect, useState } from 'react'
import Carousel from '../carousel/Carousel'
import axios from 'axios'
import styles from './section2.module.css'
import { Loading } from '../loadings/Loading'
import MyList from './MyList'

export default function Section2() {
    return (
        <>
            <section className={styles.two}>
                <MyList />
                <Section name="popular" />
                <Section name="action & Thriller" query={{ genres: ['Action', 'Thriller'] }} />
                <Section name="romance & drama" query={{ genres: ['Romance', 'Drama'] }} />
                <Section name="sci-fi" query={{ genres: ['Sci-Fi', 'Thriller'] }} />
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
        const domain = 'https://rsystem-l-2017-api.herokuapp.com'
        if (name === 'popular') {
            const url = `${domain}/popular`
            await axios.get(url, { signal: signal })
                .then(data => { setResult(data.data.popular); setLoading(false) })
                .catch(err => console.log(err))
        }
        else {
            const url = `${domain}/genres`
            await axios.post(url, { genres: query.genres }, { signal: signal })
                .then(res => { setResult(res.data.result); setLoading(false) })
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

    return (

        <div className={styles.c_section}>
            <div className={styles.head}><div className={styles.name}>{name}</div></div>
            {!loading ?
                <Carousel list={result?.sort(() => .5 - Math.random())} /> :
                <div style={{ height: '20vh', display: 'grid', placeItems: 'center', alignItems: 'center' }} ><Loading /></div>}
        </div>
    )
}