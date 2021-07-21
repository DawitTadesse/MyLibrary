const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All authors
router.get('/', async (req, res) => {
    let searchoptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchoptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchoptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query.name
        })
    } catch {
        res.render('/')
    }

})

//New author
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

//Create new author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${author.id}`)
        res.redirect(`authors`)

    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

})



module.exports = router