const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const Category = require('../models/Category');

// CREATE Event
const mongoose = require('mongoose');
const { Types } = mongoose;

// CREATE Event
router.post('/events', async (req, res) => {
  try {
    const data = req.body;

    console.log('Incoming event payload:', JSON.stringify(data, null, 2));

    // 🔥 Force cast each string to ObjectId
    if (Array.isArray(data.category_ids)) {
      data.category_ids = data.category_ids.map(id => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`Invalid ObjectId: ${id}`);
        }
        return new mongoose.Types.ObjectId(id);
      });
    }

    console.log('After ObjectId cast:', data);
    console.log('category_ids types:', data.category_ids.map(id => typeof id));

    const event = new Event(data);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
  console.error('❌ Create event error:', err);

  // Try to log the detailed error messages from Mongo
  if (err.code === 121 && err.errInfo?.details?.schemaRulesNotSatisfied) {
    console.error('🔍 Validation issues:');
    for (const rule of err.errInfo.details.schemaRulesNotSatisfied) {
      console.error('•', rule);
    }
  }

  res.status(400).json({
    error: 'Invalid event data',
    message: err.message || 'Unknown validation error',
    details: err.errInfo || null
  });
}

});

// UPDATE Event
router.put('/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    console.error('Update event error:', err);
    res.status(400).json({ error: 'Invalid event update data' });
  }
});

// CREATE Category
router.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    console.error('Create category error:', err);
    res.status(400).json({ error: 'Invalid category data' });
  }
});

// UPDATE Category
router.put('/categories/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (err) {
    console.error('Update category error:', err);
    res.status(400).json({ error: 'Invalid category update data' });
  }
});

module.exports = router;
