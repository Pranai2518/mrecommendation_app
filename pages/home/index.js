import Layout from "../../components/Layout"
import styles from '../../styles/Home.module.css'
import Sections from "../../components/sections/Sections"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/router"


function Home() {
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
                    {/* <div className={styles.categories}>
                        <button>popular</button>
                        <button className={styles.ml}>my list</button>
                    </div> */}
                </section>
                <Sections />
            </div>
        </div >

    )
}
Home.Layout = Layout

export default Home

