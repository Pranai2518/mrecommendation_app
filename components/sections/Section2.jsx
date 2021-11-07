import React, { useEffect, useState } from 'react'
import Carousel from '../carousel/Carousel'
import axios from 'axios'
import styles from './home.module.css'

export default function Section2() {

    return (
        <>
            <section className={styles.two}>
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
    const [result, setResult] = useState()
    const fetchGenre = async (signal) => {
        const domain = 'https://rsystem-l-2017-api.herokuapp.com'
        if (name === 'popular') {
            const url = `${domain}/popular`
            await axios.get(url, { signal: signal })
                .then(data => setResult(data.data.popular))
                .catch(err => console.log(err))
        }
        else {
            const url = `${domain}/genres`
            await axios.post(url, { genres: query.genres }, { signal: signal })
                .then(res => setResult(res.data.result))
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        fetchGenre(signal)
        return () => controller.abort()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.c_section}>
            <div className={styles.head}><div className={styles.name}>{name}</div></div>
            <Carousel list={result?.sort(() => .5 - Math.random())} />
        </div>
    )
}