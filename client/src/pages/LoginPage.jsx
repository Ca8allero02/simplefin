import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
        await login(form.email, form.password)
        navigate('/dashboard')
    } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong')
    } finally {
        setLoading(false)
    }
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="w-full max-w-md bg-[#1E293B] rounded-2xl p-8 shadow-xl">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">SimpleFin</h1>
            <p className="text-slate-400 mt-2">Sign in to your account</p>
        </div>

        {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0F172A] text-white rounded-lg px-4 py-3 text-sm outline-none border border-slate-700 focus:border-blue-500 transition"
                placeholder="you@example.com"
            />
            </div>

            <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0F172A] text-white rounded-lg px-4 py-3 text-sm outline-none border border-slate-700 focus:border-blue-500 transition"
                placeholder="••••••••"
            />
            </div>

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
            >
            {loading ? 'Signing in...' : 'Sign in'}
            </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition">
            Sign up
            </Link>
        </p>
        </div>
    </div>
    )
}

export default LoginPage