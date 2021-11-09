import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
export default function WithAuth(WrappedComponent) {


    const auth = (props) => {

        useEffect(() => {
            console.log(authenticated)
            if (authenticated === false) {
                Router.replace("/login")
                return <h1>Loading....</h1>
            }
        }, [])
        const Router = useRouter()
        const authenticated = useSelector(state => state.currentUser.user.authenticated)
        const comp = WrappedComponent.Layout
        return <WrappedComponent {...props} />


    }
    return auth
}
