const seedTransactions = async (userId, prisma) => {
    const now = new Date()

    const getDate = (monthsAgo, day) => {
    const date = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day)
    return date
    }

    const transactions = [
    { type: 'income', amount: 3000, category: 'Salary', date: getDate(2, 1), description: 'Monthly salary' },
    { type: 'expense', amount: 850, category: 'Housing', date: getDate(2, 3), description: 'Rent payment' },
    { type: 'expense', amount: 120, category: 'Food', date: getDate(2, 10), description: 'Groceries' },
    { type: 'income', amount: 500, category: 'Freelance', date: getDate(1, 5), description: 'Web project' },
    { type: 'expense', amount: 60, category: 'Transport', date: getDate(1, 8), description: 'Monthly transit pass' },
    { type: 'expense', amount: 200, category: 'Health', date: getDate(1, 15), description: 'Medical checkup' },
    { type: 'income', amount: 3000, category: 'Salary', date: getDate(1, 1), description: 'Monthly salary' },
    { type: 'expense', amount: 850, category: 'Housing', date: getDate(1, 3), description: 'Rent payment' },
    { type: 'income', amount: 750, category: 'Freelance', date: getDate(0, 10), description: 'Mobile app project' },
    { type: 'expense', amount: 95, category: 'Entertainment', date: getDate(0, 14), description: 'Streaming and games' },
    ]

    await prisma.transaction.createMany({
    data: transactions.map((t) => ({ ...t, userId })),
    })
}

module.exports = { seedTransactions }