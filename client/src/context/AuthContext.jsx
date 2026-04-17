import { createContext, useContext, useState } from "react"
import api from "../api/axios"

const AuthContext = createContext(null)

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    const [token, setToken]  = useState(() => {
        return localStorage.getItem('token') || null
    })

    const login = async (email, password) => {
        const response = await api.post('/auth/login', {email, password})
        const {token, user } = response.data

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setToken(token)
        setUser(user)
    }

    const register = async (name, email, password) => {
        const response = await api.post('/auth/register', {name, email, password})
        const {token, user} = response.data
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setToken(token)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, token, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
