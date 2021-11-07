import { Link } from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { toDark, toLight, setTheme } from '../redux/features/themeSlice'
import { logout } from '../redux/features/authSlice'

export default function Navbar() {
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()

    const wordRef = useRef()
    const router = useRouter()
    const { word } = router.query
    const handleTheme = () => {
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light')
            dispatch(toLight())
        }
        else {
            localStorage.setItem('theme', 'dark')
            dispatch(toDark())
        }
    }

    const [toggle, setToggle] = useState()
    // useEffect(() => {
    //     const nav = document.querySelector('.navbar')
    //     if (toggleNav && (theme === 'light')) { nav.classList.add('toggle_light'); nav.classList.remove('toggle_dark') }
    //     else if (toggleNav && (theme === 'dark')) { nav.classList.add('toggle_dark'); nav.classList.remove('toggle_light'); }
    //     else { nav.classList.remove('toggle_light'); nav.classList.remove('toggle_dark') }
    // }, [toggleNav, theme])//eslint-disable-line react-hooks/exhaustive-deps

    const handleRoute = () => {
        var word = wordRef.current.value
        if (word) {
            router.push(`/home/${word}`, undefined, { shallow: true })
            setToggle(true)
        }
        else {
            router.push(`/home`, undefined, { shallow: true })
            setToggle(false)
        }
    }
    const handleIcon = () => {
        wordRef.current.value = ''
        router.push('/home', undefined, { shallow: true })
        setToggle(false)
    }
    useEffect(() => {
        if (word) { wordRef.current.value = word; setToggle(true) }
        else { wordRef.current.value = ''; setToggle(false) }
        const t = window.localStorage.getItem('theme')
        if (t) dispatch(setTheme(t))
    }, [])
    return (

        <div className={styles.navbar}>
            <div className={styles.burger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={styles.search_bar}>
                <input type="text" placeholder='search movie' ref={wordRef} onChange={handleRoute} />
                <button>{toggle ? <img onClick={handleIcon} src='/assets/x-mark-thin.png' alt='hh' style={{ cursor: 'pointer' }} /> : <img src='/assets/search-thin.png' alt='hh' />}</button>
            </div>
            <div className={styles.profile}>
                <div className={styles.img} onClick={handleTheme} >{theme === 'dark' ? <h5 style={{ margin: '0' }}>D</h5> : <h5 style={{ margin: '0' }}>L</h5>}</div>
                <div className={styles.name} >Hello <p>There!</p></div>
                <button >Logout</button>
            </div>
        </div>

    )
}
