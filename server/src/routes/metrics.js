const express = require('express')
const { getMetrics } = require('../controllers/metricsController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', getMetrics)

module.exports = router