const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/test', function (req, res) {
    res.json({
        message: 'testing....'
    });
})

router.post('/user/create', UserController.create)

module.exports = router;