const router = require('express').Router()
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');

//get all posts for homepage
router.get('/', (req,res) => {
    Post.findAll({
        include:[
            {
            model:Comment,
            include:{
                model:User,
                attributes:['username']
            }
            },
            {
                model:User,
                attributes:['username']
            }
        ]
    }).then(dbPostData => {
            const posts = dbPostData.map(post => post.get({plain:true}))
            res.render('homepage', {posts})
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//get the login and signup form 
router.get('/login', (req,res) => {
res.render('login')
})

module.exports = router