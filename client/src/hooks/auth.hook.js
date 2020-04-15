import {useState} from "react"

export const useAuth = () => {

    const [authenticated, setAuthenticated] = useState(false)
    const [ready, setReady] = useState(false)

    const checkAuth = async () => {
        const response = await fetch('/api/auth')
        const data = await response.json()
        setAuthenticated(data.auth)
        setReady(true)
    }

    const login = async (pass) => {
        const response = await fetch('/api/auth', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password:pass
            })})
        const data = await response.json()
        setAuthenticated(data.auth)
        setReady(true)
    }


    return {ready, authenticated, login, checkAuth}
}