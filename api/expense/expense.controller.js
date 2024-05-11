import { expenseService } from './expense.service.js'
import { logger } from '../../services/logger.service.js'

export async function getExpenses(req, res) {
    try {
        logger.debug('Getting Expenses:', req.query)
        const expenses = await expenseService.getExpenses()
        res.json(expenses)
    } catch (err) {
        logger.error('Failed to get expenses', err)
        res.status(400).send({ err: 'Failed to get expenses' })
    }
}

export async function getExpenseById(req, res) {
    try {
        const expenseId = req.params.id
        const expense = await expenseService.getById(expenseId)
        res.json(expense)
    } catch (err) {
        logger.error('Failed to get expense', err)
        res.status(400).send({ err: 'Failed to get expense' })
    }
}

export async function addExpense(req, res) {
    const { loggedinUser } = req

    try {
        const expense = req.body
        expense.createdBy = loggedinUser
        const addedExpense = await expenseService.add(expense)
        res.json(addedExpense)
    } catch (err) {
        logger.error('Failed to add expense', err)
        res.status(400).send({ err: 'Failed to add expense' })
    }
}


export async function updateExpense(req, res) {
    // console.log('req', req)
    try {
        const expense = req.body
        const updatedExpense = await expenseService.update(expense)
        res.json(updatedExpense)
    } catch (err) {
        logger.error('Failed to update expense', err)
        res.status(400).send({ err: 'Failed to update expense' })

    }
}

export async function removeExpense(req, res) {
    console.log('req', req)
    try {
        const expenseId = req.params.id
        const removedId = await expenseService.remove(expenseId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove expense', err)
        res.status(400).send({ err: 'Failed to remove expense' })
    }
}