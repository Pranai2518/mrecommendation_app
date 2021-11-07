import Layout from "../../components/Layout"
import styles from '../../components/sections/home.module.css'
import axios from 'axios'
import Section2 from "../../components/sections/Section2"
import MyList from "../../components/sections/MyList"

export default function Home() {

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
