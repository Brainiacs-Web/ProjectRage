const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  code:        { type: String, required: true, unique: true },
  testName:    { type: String, required: true },
  batch:       { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  testDuration:{ type: Number, required: true },
  subjects:    [String],
  scheduledAt: Date,
  published:   { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
  publishedAt: Date
});

module.exports = mongoose.model('Test', TestSchema);
