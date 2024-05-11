import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getExpenses, getExpenseById, addExpense, updateExpense, removeExpense } from './expense.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getExpenses)
router.get('/:id', getExpenseById)
router.post('/', addExpense)
router.put('/:id', updateExpense)
router.delete('/:id', removeExpense)
// router.delete('/:id', requireAdmin, removeExpense)

export const expenseRoutes = router