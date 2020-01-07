const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
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
  totalSpent: {
    type: Number,
    default: 0
  },
  totalRemaining: {
    type: Number,
    default: 0
  },
  people: [
    {
      name: String,
      budget: {
        type: Number,
        default: 0
      },
      spent: {
        type: Number,
        default: 0
      },
      remaining: {
        type: Number,
        default: 0
      },
      items: [
        {
          itemName: String,
          itemCost: {
            type: Number,
            default: 0
          }
        }
      ]
    }
  ]
});

const Dashboard = mongoose.model('Dashboard', DashboardSchema);

module.exports = Dashboard;
