const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

//get all comments
router.get('/', (req,res)=>{
    Comment.findAll({
        order:[['created_at', 'DESC']],
        include:{
            model:Post,
            attributes:['username']
        }
    }).then(dbPostData => {
        res.json(dbPostData)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//create a comment
router.post('/', (req,res) => {
    Comment.create({
            comment_text:req.body.comment_text,
            user_id:req.body.user_id,
            post_id:req.body.post_id
    }).then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//update comment
router.put('/:id', (req,res) => {
    dbCommentData.update(
    {
       title:req.body.title
    },
    {   
    Where: {
            id:req.params.id
        }
    }
).then(dbPostData => {
    if(!dbPostData) {
        res.status(404).json({message:'no comment found with this id'})
    }
    else {
        res.json(dbPostData)
    }
})    
.catch(err => {
    console.log(err)
    res.status(500).json(err)
})

})

// delete a comment
router.delete('/:id',(req,res)=> {
    Comment.delete({
        where:{
            id:req.param.id
        }
    }).then(dbCommentData=> {
        if(!dbCommentData) {
            res.status(400).json({message:'this comment does not exist'})
        }
        else {
            res.json(dbCommentData)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
    
})


module.exports = router