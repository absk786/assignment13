const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');


router.get('/',{
attributes:{exclude:['password']}
}).then(dbUserData => {
res.json(dbUserData) 
}).catch(err => {
    console.log(err);
    res.status(500).json(err)
})

router.post('/',(req,res) => {
    User.Create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
}).then(dbUserData => res.json(dbUserData))
.catch(err => {
    console.log(err)
    res.status(500).json(err)
})

module.exports = router