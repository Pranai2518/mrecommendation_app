import { useEffect } from 'react'

export default function login() {
    useEffect(() => {
        console.log(process.env.OMDB_KEY)
    }, [])

    return (
        <div>
            <h1>.login page</h1>
        </div>
    )
}
