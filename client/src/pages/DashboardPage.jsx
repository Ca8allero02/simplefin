import { useState, useEffect } from 'react'
import api from '../api/axios'
import Navbar from '../components/layout/Navbar'
import SummaryCard from '../components/dashboard/SummaryCard'
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart'
import CategoryChart from '../components/dashboard/CategoryChart'

const DashboardPage = () => {
    const [metrics, setMetrics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
    const fetchMetrics = async () => {
        try {
        const response = await api.get('/metrics')
        setMetrics(response.data)
        } catch (err) {
        setError('Failed to load metrics')
        } finally {
        setLoading(false)
        }
    }

    fetchMetrics()
    }, [])

    if (loading) {
    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading dashboard...</p>
        </div>
    )
    }

    if (error) {
    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
        </div>
    )
    }

    return (
    <div className="min-h-screen bg-[#0F172A]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
            <h2 className="text-white text-2xl font-bold">Dashboard</h2>
            <p className="text-slate-400 text-sm mt-1">
            Your financial overview
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <SummaryCard
            title="Total Income"
            value={metrics.totalIncome}
            type="income"
            />
            <SummaryCard
            title="Total Expenses"
            value={metrics.totalExpenses}
            type="expense"
            />
            <SummaryCard
            title="Balance"
            value={metrics.balance}
            type="balance"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncomeExpenseChart data={metrics.chartData} />
            <CategoryChart data={metrics.categoryBreakdown} />
        </div>
        </main>
    </div>
    )
}

export default DashboardPage