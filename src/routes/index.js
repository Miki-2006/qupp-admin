import express from 'express'
import quoteRouter from './quoteRoutes.js'
import quoteVideoRoutes from './quoteVideoRoutes.js'
import loginRouter from './loginRoutes.js'

const router = express.Router()

router.use('/quotes', quoteRouter)
router.use('/videos', quoteVideoRoutes)
router.use('/admin', loginRouter)   

export default router