import express from 'express'
import { addNewQuote, fetchByCategory, editQuote, setDailyQuote, fetchAllQuotes, deleteQuote, editCategoryOfQuote } from '../controllers/quoteController.js'

const quoteRouter = express.Router()

quoteRouter.get('/all', fetchAllQuotes)
quoteRouter.get('/:category', fetchByCategory)
quoteRouter.post('/new', addNewQuote)
quoteRouter.patch('/quote/:id', editQuote)
quoteRouter.patch('/category/:id', editCategoryOfQuote)
quoteRouter.put('/daily-quote', setDailyQuote)
quoteRouter.delete('/:id', deleteQuote)

export default quoteRouter