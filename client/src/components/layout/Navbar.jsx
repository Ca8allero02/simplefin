import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()

    return (
    <header className="h-16 bg-[#1E293B] border-b border-slate-700 flex items-center justify-between px-6">
        <h1 className="text-white font-bold text-xl">SimpleFin</h1>
        <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm">
            Welcome, <span className="text-white font-medium">{user?.name}</span>
        </span>
        <button
            onClick={logout}
            className="text-sm text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 px-3 py-1.5 rounded-lg transition"
        >
            Sign out
        </button>
        </div>
    </header>
    )
}

export default Navbar