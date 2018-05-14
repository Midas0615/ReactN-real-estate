const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const IdxController = require('../controllers/IdxController');

router.get('/test', function (req, res) {
    res.json({
        message: 'testing....'
    });
})

router.post('/user/create', UserController.create)
router.get('/idx/testing', IdxController.testing)
module.exports = router;