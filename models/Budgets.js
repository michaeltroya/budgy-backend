const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalBudget: {
    type: Number,
    default: 0
  },
  totalRemaining: {
    type: Number,
    default: 0
  },
  person: [
    {
      name: String,
      budget: Number,
      remaining: Number,
      items: [
        {
          itemName: String,
          itemCost: Number
        }
      ]
    }
  ]
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = Budget;
