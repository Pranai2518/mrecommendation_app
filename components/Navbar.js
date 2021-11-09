import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { toDark, toLight, setTheme } from '../redux/features/themeSlice'
import { logout } from '../redux/features/authSlice'

import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const theme = useSelector((state) => state.theme.value)
    const pUrl = useSelector(state => state.currentUser.user.photoUrl)
    const dispatch = useDispatch()

    const wordRef = useRef()
    const router = useRouter()
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
            window.localStorage.setItem('s-word', word)
            router.push(`/home/${word}`, undefined, { shallow: true })
            setToggle(true)
        }
        else {
            window.localStorage.setItem('s-word', word)
            router.push(`/home`, undefined, { shallow: true })
            setToggle(false)
        }
    }
    const handleIcon = () => {
        wordRef.current.value = ''
        window.localStorage.removeItem('s-word')
        router.push('/home', undefined, { shallow: true })
        setToggle(false)
    }
    useEffect(() => {
        let s = window.localStorage.getItem('s-word')
        if (s) { wordRef.current.value = s; setToggle(true) }
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
                <div className={styles.theme} onClick={handleTheme} >{theme === 'dark' ? <WbSunnyIcon /> : <Brightness2Icon />}</div>
                {/* <div className={styles.name} >Hello <p>There!</p></div> */}
                <div className={styles.user}>
                    <div className={styles.pic}><img src={pUrl} alt='profile' /></div>
                    <div className={styles.logout} ><LogoutIcon onClick={() => { dispatch(logout()) }} /></div>
                </div>

            </div>
        </div>

    )
}

export default Navbar