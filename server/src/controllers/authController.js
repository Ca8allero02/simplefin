const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const { PrismaClient } = require ('@prisma/client')
const { seedTransactions } = require('../seed')

const prisma = new PrismaClient()

const register = async (req, res) => {
    const {name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    try{
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword},
        })

        await seedTransactions(user.id, prisma)

        await prisma.user.update({
            where: {id: user.id },
            data: { seeded: true },
        })

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '7d',})

        res.status(201).json({
            token,
            user: {id: user.id, name: user.name, email: user.email },
        })
    } catch (error) {
        res.status(500).json({ message: 'Server Error'})
    }
}

const login = async (req, res) => {
    const { email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    try {
        const user = await prisma.user.findUnique({ where: { email }})
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: isSecureContext.id }, process.env.JWT_SECRET, { expiresIn: '7d', })
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        })
    } catch (error) {
    res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { register, login }