const express  = require('express');
const router   = express.Router();
const Question = require('../models/Question');

// GET questions for a given test & subject
router.get('/:testId/:subject', async (req, res) => {
  const qs = await Question.find({
    test: req.params.testId,
    subject: req.params.subject
  });
  res.json(qs);
});

// POST add question
router.post('/', async (req, res) => {
  const {
    test, subject,
    question, questionType,
    options, correctAnswer,
    solution
  } = req.body;

  const q = new Question({
    test, subject,
    question, questionType,
    options, correctAnswer,
    solution,
    addedAt: Date.now()
  });
  await q.save();
  res.json(q);
});

module.exports = router;
