const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getTransactions = async (req, res) => {
    const { type, startDate, endDate } = req.query

    try {
    const where = { userId: req.userId }

    if (type) where.type = type

    if (startDate || endDate) {
        where.date = {}
        if (startDate) where.date.gte = new Date(startDate)
        if (endDate) where.date.lte = new Date(endDate)
    }

    const transactions = await prisma.transaction.findMany({
        where,
        orderBy: { date: 'desc' },
    })

    res.json(transactions)
    } catch (error) {
    res.status(500).json({ message: 'Server error' })
    }
}

const createTransaction = async (req, res) => {
    const { type, amount, category, date, description } = req.body

    if (!type || !amount || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' })
    }

    if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: 'Type must be income or expense' })
    }

    if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' })
    }

    try {
    const transaction = await prisma.transaction.create({
        data: {
        type,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        description: description || null,
        userId: req.userId,
        },
    })

    res.status(201).json(transaction)
    } catch (error) {
    res.status(500).json({ message: 'Server error' })
    }
}

const updateTransaction = async (req, res) => {
    const { id } = req.params
    const { type, amount, category, date, description } = req.body

    try {
    const existing = await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
    })

    if (!existing || existing.userId !== req.userId) {
        return res.status(404).json({ message: 'Transaction not found' })
    }

    const updated = await prisma.transaction.update({
        where: { id: parseInt(id) },
        data: {
        type: type ?? existing.type,
        amount: amount ? parseFloat(amount) : existing.amount,
        category: category ?? existing.category,
        date: date ? new Date(date) : existing.date,
        description: description ?? existing.description,
        },
    })

    res.json(updated)
    } catch (error) {
    res.status(500).json({ message: 'Server error' })
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params

    try {
    const existing = await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
    })

    if (!existing || existing.userId !== req.userId) {
        return res.status(404).json({ message: 'Transaction not found' })
    }

    await prisma.transaction.delete({ where: { id: parseInt(id) } })

    res.json({ message: 'Transaction deleted' })
    } catch (error) {
    res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
}