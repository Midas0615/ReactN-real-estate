const User = require('../models/users_mdl');

const UserController = module.exports = {
    create: function (req, res) {
        let newUser = new User({
            name: req.body.name,
            nickname: req.body.nickname,
            email: req.body.email,
            emailVerified: req.body.emailVerified,
            picture: req.body.picture,
            userId: req.body.userId,
            createdAt: req.body.createdAt
        });

        return newUser.save((err, user) => {
            if (err) {
                res.status(500);
                res.end("something went wrong\n");
                return;
            }
            res.json(user);
        })
    }
}