import { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { loginWithGoogle } from '../redux/features/authSlice'
import { useRouter } from 'next/router'

const Log = styled.button`
    font-size:2rem;
    margin-top:10%;
`
export default function login() {
    const router = useRouter()
    const dispatch = useDispatch()
    const loading1 = useSelector(state => state.currentUser.status)
    const access = useSelector(state => state.currentUser.user.authenticated)
    useEffect(() => {
        console.log(`login:${access}`)
        if (access) router.replace('/home', undefined, { shallow: true })
    }, [access])

    return (
        <div style={{ display: 'grid', placeItems: 'center' }}>
            {loading1 !== 'loading' ?
                <>
                    <Log onClick={() => { dispatch(loginWithGoogle()) }} >Login</Log>
                </>
                : <CircularProgress style={{ marginTop: '10%' }} color='primary' />
            }
        </div>
    )
}
