const express = require('express');
const router = express.Router();
const Todo = require('../models/TodoModel');
const fetchuser = require('../middleware/fetchuser')


// Show Todo
router.get('/todoListShow', fetchuser, async (req, res) => {
  try {
    let data = await Todo.find({ user: req.user.id })
    res.json(data)

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Action Failed' });
  }
});

// Add Todo
router.post('/addTodo', fetchuser, async (req, res) => {
  try {
    let { text, completed } = req.body;
    let data = new Todo({ text, completed, user: req.user.id });
    const savedTodo = await data.save();
    res.status(200).json(savedTodo)

  } catch (error) {
    res.status(500).json({ message: 'Action Failed' });
  }
});

// Delete Todo
router.delete('/deleteTodo/:id', fetchuser, async (req, res) => {
  try {
    let { id } = req.params;
    // check valid user
    const checkUser = await Todo.findById(id)
    if (!checkUser) {
      return res.status(404).json({ message: 'No such todo exists' })
    }
    if (checkUser.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Invalid User' })
    }

    await Todo.findByIdAndDelete({ "_id": id })
    res.status(200).json()

  } catch (error) {
    res.status(500).json({ message: 'Action Failed' });
  }
});

// Edit Todo
router.put('/editTodo', fetchuser, async (req, res) => {
  try {
    let { id, completed } = req.body
    // check valid user
    const checkUser = await Todo.findById(id)
    if (!checkUser) {
      return res.status(404).json({ message: 'No such Todo exists' })
    }
    if (checkUser.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Invalid User' })
    }
    // update todo
    await Todo.updateOne({ "_id": id }, { $set: { "completed": !completed } })
    res.status(200).json()

  } catch (error) {
    res.status(500).json({ message: 'Action Failed' });
  }
});


module.exports = router