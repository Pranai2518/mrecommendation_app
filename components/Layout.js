import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToDB, setUserStatus } from '../redux/features/authSlice'
import { fetchMovies, reloadList } from '../redux/features/userDataSlice'
import Navbar from "./Navbar"
import MovieModal from './Moviedetails/MovieModal'

export default function Layout({ children }) {
    const all = useSelector(state => state.currentUser.all)
    const uid = useSelector(state => state.currentUser.user.uid)
    const user = useSelector(state => state.currentUser.user)
    const status = useSelector(state => state.currentUser.status)
    const modalStatus = useSelector(state => state.movie.open)
    const dispatch = useDispatch()

    const statusm = useSelector(state => state.userData.status)

    useEffect(() => {
        if (statusm === 'succeeded' && modalStatus === false) { dispatch(fetchMovies(uid)); }
        if (statusm === 'loaded' && modalStatus === false) dispatch(reloadList())
    }, [statusm])//eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (status === 'succeeded') {
            const a = all.filter(i => i === uid)
            if (a.length === 0) {
                dispatch(addToDB(user))
            } else {
                dispatch(setUserStatus('idle'))
                // console.log('old User')
            }
            // setTimeout(() => { dispatch(fetchMovies(uid)); }, 500)

        }
    }, [status])//eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Navbar />
            {children}
            <MovieModal />
        </>
    )
}
