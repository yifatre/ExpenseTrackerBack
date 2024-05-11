import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function getExpenses() {
    try {
        const collection = await dbService.getCollection('expense')
        var expenses = await collection.find().toArray()

        return expenses
    } catch (err) {
        logger.error('cannot find expenses', err)
        throw err
    }
}

async function getById(expenseId) {
    try {
        const collection = await dbService.getCollection('expense')
        const expense = await collection.findOne({ _id: new ObjectId(expenseId) })
        expense.createdAt = new ObjectId(expense._id).getTimestamp()

        return expense
    } catch (err) {
        logger.error(`while finding expense ${expenseId}`, err)
        throw err
    }
}

async function remove(expenseId) {
    try {
        const collection = await dbService.getCollection('expense')
        await collection.deleteOne({ _id: new ObjectId(expenseId) })
        return expenseId
    } catch (err) {
        logger.error(`cannot remove expense ${expenseId}`, err)
        throw err
    }
}

async function add(expense) {
    try {
        const collection = await dbService.getCollection('expense')
        await collection.insertOne(expense)
        return expense
    } catch (err) {
        logger.error('cannot insert expense', err)
        throw err
    }
}

async function update(expense) {
    console.log('expense', expense)
    try {
        const expenseToSave = {
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            notes: expense.notes,
        }

        const collection = await dbService.getCollection('expense')
        await collection.updateOne({ _id: new ObjectId(expense._id) }, { $set: expenseToSave })
        return expense
    } catch (err) {
        logger.error(`cannot update expense ${expense.id}`, err)
        throw err
    }
}

export const expenseService = {
    remove,
    getExpenses,
    getById,
    add,
    update
}
