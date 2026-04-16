const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getMetrics = async (req, res) => {
    try {
    const transactions = await prisma.transaction.findMany({
        where: { userId: req.userId },
    })

    // Totals
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIncome - totalExpenses

    // Last 6 months chart data
    const now = new Date()
    const months = []

    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        months.push({
        month: date.toLocaleString('en-US', { month: 'short' }),
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        income: 0,
        expense: 0,
        })
    }

    transactions.forEach((t) => {
        const tDate = new Date(t.date)
        const tMonth = tDate.getMonth()
        const tYear = tDate.getFullYear()

        const match = months.find(
        (m) => m.monthIndex === tMonth && m.year === tYear
        )

        if (match) {
        if (t.type === 'income') match.income += t.amount
        else match.expense += t.amount
        }
    })

    const chartData = months.map(({ month, income, expense }) => ({
        month,
        income: parseFloat(income.toFixed(2)),
        expense: parseFloat(expense.toFixed(2)),
    }))

    // Category breakdown (expenses only)
    const categoryMap = {}

    transactions
        .filter((t) => t.type === 'expense')
        .forEach((t) => {
        if (!categoryMap[t.category]) categoryMap[t.category] = 0
        categoryMap[t.category] += t.amount
        })

    const categoryBreakdown = Object.entries(categoryMap).map(
        ([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
        })
    )

    res.json({
        totalIncome: parseFloat(totalIncome.toFixed(2)),
        totalExpenses: parseFloat(totalExpenses.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        chartData,
        categoryBreakdown,
    })
    } catch (error) {
    res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { getMetrics }