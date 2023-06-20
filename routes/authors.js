const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Author route
router.get('/', (req, res) => {
    res.render('authors/index')
})

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

// Create Author Route
router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    author.save((error, newAuthor) => {
        if(error){
            res.render('authors/new', {
                author: author,
                errorMessage: "Error creating Author"
            })
        }
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    })
})

module.exports = router