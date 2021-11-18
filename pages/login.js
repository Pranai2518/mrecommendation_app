import { useEffect } from 'react'

import styles from '../styles/Login.module.css'
import { CircularProgress } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import { loginWithGoogle } from '../redux/features/authSlice'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { flexbox } from '@mui/system'



export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch()
    const loading1 = useSelector(state => state.currentUser.status)
    const access = useSelector(state => state.currentUser.user.authenticated)
    useEffect(() => {
        // console.log(`login:${access}`)
        if (access) router.replace('/home', undefined, { shallow: true })
    }, [access])

    return (
        <div className={styles.container} >
            {loading1 === 'loading' ?

                <CircularProgress style={{ width: '100vw', marginTop: '25%', display: 'flex', justifyContent: 'center' }} color='primary' />
                : <>
                    <div className={styles.bg} >
                        <Image priority layout='fill' objectPosition='65%' objectFit='cover' src='/assets/land1.png' />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.desc} >
                            You won’t watch the movies the way you were in kid
                        </div>
                        <div className={styles.lbtn}>

                            <button onClick={() => { dispatch(loginWithGoogle()) }}  >SignIn with Google</button>
                        </div>

                    </div>
                </>
            }


        </div>
    )
}
