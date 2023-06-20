const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // This will render the index.ejs file
    res.render('index')
})

module.exports = router