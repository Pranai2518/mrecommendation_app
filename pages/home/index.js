import Layout from "../../components/Layout"
import styles from '../../components/sections/home.module.css'
import axios from 'axios'
import Section2 from "../../components/sections/Section2"
import MyList from "../../components/sections/MyList"
import WithAuth from "../../hooks/WithAuth"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"


function Home() {
    const [access, setAccess] = useState(false)
    const router = useRouter()
    const user = useSelector(state => state.currentUser.user.authenticated)
    useEffect(() => {
        if (!user) router.replace('/login')
    }, [user])

    return (
        <div className={styles.home}>
            <div className={styles.container} >
                <section className={styles.one}>
                    <div className={styles.heading}>
                        <p>Movie</p><p>Recommendation</p>
                    </div>
                    <div className={styles.categories}>
                        <button>popular</button>
                        <button className={styles.ml}>my list</button>
                    </div>
                </section>
                <MyList />
                <Section2 />
            </div>
        </div >
    )
}
Home.Layout = Layout

export default Home

// export const getServerSideProps = async () => {
//     const store1 = store.getState()
//     const a = store1.currentUser.user.authenticated
//     console.log(a)
//     if (a) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false
//             }
//         }
//     }
//     return {
//         props: { a }
//     }
// }

// export const getStaticProps = async () => {
//     var movie = ''
//     await axios.get('https://www.omdbapi.com/?apikey=6b1d57fa&i=tt0468569')
//         .then(data => {
//             movie = data.data
//         })

//     return {
//         props: { movie }
//     }
// }
