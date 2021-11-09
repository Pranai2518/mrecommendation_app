import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Search.module.css'
import Card from '../../components/card/Card'
import { useRouter } from 'next/router'
import { Loading } from '../../components/loadings/Loading'
import { useSelector } from 'react-redux'
import WithAuth from '../../hooks/WithAuth'

function search() {
    const router = useRouter()
    const { word } = router.query
    const [ids, setIds] = useState()
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.currentUser.user.authenticated)
    const status = useSelector(state => state.currentUser.status)

    const getAllIds = async (signal) => {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/search/${word}`, { signal: signal })
            .then(data => setIds(data.data.result))
            .catch(err => console.log(err))
        setLoading(false)
    }

    useEffect(() => {
        if (!user && status === 'checked') router.replace('/login')
    }, [user])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true)
        getAllIds(signal)

        return () => { controller.abort() }
    }, [word])

    return (

        <div className={styles.search_m} >
            {loading ? <Loading /> :
                <>
                    {ids?.length ?
                        <div className={styles.content}>
                            {ids.map(id => (
                                <Card id={id} key={id} size='medium' />
                            ))}
                        </div>
                        : <div style={{ display: 'grid', placeItems: 'center', paddingTop: '20%' }}> <h1>No Matches</h1></div>}
                </>}
        </div>

    )
}

search.Layout = Layout

export default search

// export const getServerSideProps = async (context) => {
//     var ids
//     await axios.get(`https://rsystem-l-2017-api.herokuapp.com/search/${context.params.word}`)
//         .then(data => { ids = data.data.result })

//     return {
//         props: {
//             ids
//         }
//     }
// }
