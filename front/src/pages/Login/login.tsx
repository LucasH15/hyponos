import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

interface State {
    register?: string
}

const Login = () => {
    const location = useLocation()
    const state = location.state as State

    useEffect(() => {
        if (state?.register === 'success') {
            toast.success(
                "Vous êtes bien inscrit, plus qu'à vous connecter pour profiter de notre site"
            )
        }
    }, [state])

    return <h1>LOGIN</h1>
}

export default Login
