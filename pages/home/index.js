import Layout from "../../components/Layout"
import styles from '../../components/sections/home.module.css'
import Section2 from "../../components/sections/Section2"
import MyList from "../../components/sections/MyList"
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
                <MyList />
                <Section2 />
            </div>
        </div >

    )
}
Home.Layout = Layout

export default Home

