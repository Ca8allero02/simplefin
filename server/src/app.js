const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const transactionRoutes = require('./routes/transactions')
const metricsRoutes = require('./routes/metrics')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/metrics', metricsRoutes)

app.get('/api/health', (req, res) => {
    res.json({status: 'ok', project: 'SimpleFin'})
})

module.exports = app