const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books-controller');
const notFoundController = require('../controllers/not-found-controllers');


router.get('/books', booksController.all);
router.post('/books', booksController.create);
router.get('/book/:id', booksController.update);
router.put('/book/:id', booksController.update);
router.delete('/book/:id', booksController.destroy);

router.get('*', notFoundController.show);


module.exports = router;