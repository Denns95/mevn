const express = require('express');
const router = express.Router()

const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const task = await Task.find()
    res.json(task)
})

router.post('/', async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    res.json({
        status: 'Task Saved'
    })
})

router.put('/:id', async (req, res) => {
    // const { title, description } = req.body
    await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: 'Task Updated'
    })
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Task Deleted'
    })
})

module.exports = router