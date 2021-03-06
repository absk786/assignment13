const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
console.log("==============POST ROUTES PAGE CALLED=================================")


router.get('/', (req,res)=>{
    Post.findAll({
        order:[['created_at', 'DESC']],
        include:[
            //include the comment model here
            {
              model:Comment,
              attributes:['id','comment_text','post_id','user_id','created_at'],
              include:{
                model:User,
                attributes:['username']
              }
            },
            {
              model: User,
              attributes: ['username']
    
            }
          ],
    }).then(dbPostData => {
        res.json(dbPostData)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id',(req,res) =>{
    Post.findOne({
        where:{
            id:req.params.id
        },
        include:{
            model:User,
            attributes:['username']
        }
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message:'Could not find the post with this id'})
        }
        else {
            res.json(dbPostData)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//create a post
router.post('/', (req,res) => {
    console.log("==================CREATE POST CALLED?=============================")
    Post.create({
            title: req.body.title,
            post_url: req.body.post_url,
            user_id: req.body.user_id
    }).then(dbPostData => {
        console.log(req.body)
        res.json(dbPostData)})
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


//update post
router.put('/:id', (req,res) => {
    Post.update(
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
        res.status(404).json({message:'no post found with this id'})
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

router.delete('/:id',(req,res)=> {
    Post.destroy({
        where:{
            id:req.param.id
        }
    }).then(dbPostData=> {
        if(!dbPostData) {
            res.status(400).json({message:'this post does not exist'})
        }
        else {
            res.json(dbPostData)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
    
})


module.exports = router