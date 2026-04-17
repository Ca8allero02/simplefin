import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const IncomeExpenseChart = ({ data }) => {
    if (!data || data.length === 0) {
    return (
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700 flex items-center justify-center h-64">
        <p className="text-slate-400 text-sm">No data available</p>
        </div>
    )
    }

    return (
    <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip
            contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9',
            }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar dataKey="income" name="Income" fill="#22C55E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
    </div>
    )
}

export default IncomeExpenseChart