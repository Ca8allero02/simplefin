import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const COLORS = ['#3B82F6', '#22C55E', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899']

const CategoryChart = ({ data }) => {
    if (!data || data.length === 0) {
    return (
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700 flex items-center justify-center h-64">
        <p className="text-slate-400 text-sm">No data available</p>
        </div>
    )
    }

    return (
    <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
        <PieChart>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip
            contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9',
            }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
        </PieChart>
        </ResponsiveContainer>
    </div>
    )
}

export default CategoryChart