import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Search.module.css'
import Card from '../../components/card/Card'
import { useRouter } from 'next/router'
import { Loading } from '../../components/loadings/Loading'
import { useSelector } from 'react-redux'

function Search() {
    const router = useRouter()
    const { word } = router.query
    const [ids, setIds] = useState()
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.currentUser.user.authenticated)
    const status = useSelector(state => state.currentUser.status)

    const getAllIds = async (signal) => {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/search/${word}`, { signal: signal })
            .then(data => {
                setIds(data.data.result)
                setLoading(false)
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        if (!user) router.replace('/login')
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
            <div className={styles.container}>

                {loading ? <div className={styles.load_bars} ><Loading /></div> :
                    <>
                        {ids?.length > 0 ?
                            <div className={styles.content}>
                                {ids.map(id => (
                                    <Card id={id} key={id} size='medium' />
                                ))}
                            </div>
                            : <div className={styles.msg} > <h1>No Matches</h1></div>}
                    </>}
            </div>
        </div>

    )
}

Search.Layout = Layout

export default Search

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
