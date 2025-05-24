const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  test:         { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  subject:      { type: String, required: true },
  question:     String,
  questionType: { type: String, enum: ['MCQ','Integer'], required: true },
  options:      [String],
  correctAnswer:String,
  solution:     String,
  addedAt:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
