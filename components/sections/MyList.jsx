import React from 'react'
import { useSelector } from 'react-redux'

import Carousel from '../carousel/Carousel'
import styles from './mylist.module.css'
import { Loading } from '../loadings/Loading'

export default function MyList() {
    // console.log(`fetched:${list?.map(i => i.title)}`)
    // const [result, setResult] = useState()
    // const movies = useSelector(state => state.userData.movies)
    const status = useSelector(state => state.userData.status)
    const list = useSelector(state => state.userData.myList)
    // useEffect(()=>{
    //     if(status === 'listLoaded'){
    //         list = movies.filter(i=>i.myList === true)
    //         setResult(list)
    //     }
    // },[status])

    return (
        <>
            {list.length ?
                <div className={styles.mylist} >
                    <div className={styles.head}><span></span><div className={styles.name}>mylist</div></div>
                    {status === 'listLoaded' ?
                        <Carousel list={Array.from(list).reverse()?.map(i => i.movieId)} />
                        : <div style={{ height: 'min(50vh,30rem)', display: 'grid', placeItems: 'center', alignItems: 'center' }} ><Loading /></div>}
                </div >

                : ''}
        </>

    )
}