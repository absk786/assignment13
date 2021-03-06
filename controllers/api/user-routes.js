const router = require('express').Router();
const sequelize = require('../../config/connection');
console.log("user routes loaded")
const { Post, User, Comment } = require('../../models');

//get all users without password
router.get('/', (req,res) => {
    User.findAll({
        attributes:{exclude:['password']}
}).then(dbUserData => {
res.json(dbUserData) 
}).catch(err => {
    console.log(err);
    res.status(500).json(err)
})
})

//request api/users/:id
router.get('/:id', (req,res) => {
    User.findOne({
        attributes:{exclude:['password']},
        where:{
            id: req.params.id
        },
        include:{
            model:Post
        },
        include:{
            model:Comment,
            include:{
                model:Post,
                attributes:['title']
            }
        }
    })
})

//create a user
router.post('/',(req,res) => {
    console.log("======================================================================"),
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(dbUserData => {
    console.log("======================================================================"),
        res.json(dbUserData)})
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})
//delete a user
router.delete('/:id',(req,res) => {
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message:'this user does not exist'})
        }
        else {
            res.json(dbUserData)
        }
    })
})
//

module.exports = router;