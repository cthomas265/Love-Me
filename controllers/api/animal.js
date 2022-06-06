const router = require('express').Router()
const path = require('path')
const Category = require('../../models/Category')

// API Routes
router.get('/api/cats', (req, res) => {
    const cats = Category.filter(animal => animal.name === 'cat')
    res.json(cats)
  })
  
  router.get('/api/dogs', (req, res) => {
    const dogs = Category.filter(animal => animal.name === 'dog')
    res.json(dogs)
  })

  module.exports = router;
