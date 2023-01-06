import {db} from '../../models/v2/db.js';
import moment from 'moment';

export const getPost = async (req, res, next) => {

    const {page} = req.query
    const limit = 2;
    const startIndex = (Number(page)-1) * limit;
    const q = "SELECT `username`,`profilepic`, `title`, `desc`, `img`, `cat`, `date`, FROM `users` u JOIN posts p ON u.id === p.authur WHERE p.slug = ?"

    db.query(q,[req.params.id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json({post:post,totalPages:Math.ceil(total/limit)})
    })
}


export const getPosts =  (req, res, next) => {
    const q = "SELECT * FROM posts ORDER BY date DESC LIMIT ? OFFSET ?";
    const {page} = req.query
    const limit = 4;
    const startIndex = (Number(page)-1)*limit;

    db.query(q,[limit, startIndex], (err, data) => {
        if(err) return next(err);
        const total = data.length();
        res.status(200).json({data, currentPage:Number(page), totalPages: Math.ceil(total/limit)})
    
    })
} 


export const userPosts = async (req, res, next) => {
    
    const {page} = req.query
    const {id} = req.params
    const limit = 4;
    const startIndex = (Number(page)-1)*limit

    const q = "SELECT p.* u.username, u.profilepic, u.id FROM posts p INNER JOIN users u ON p.authur = u.id WHERE u.id = ? ORDER BY p.date DESC  LIMIT ? OFFSET ?"
    db.query(q,[id,limit,startIndex], (err, data) => {
        if(err) return next(err);
        const total = data.length();
        const totalP = Math.ceil(total/limit) 
        res.status(200).json({posts:data,totalP:totalP})

    })
}

export const createPost = async (req, res, next) => {
    const {title, img,slug,body,cat,authur} = req.body;
    const q = "INSERT INTO posts(`title`, `img`,`slug`,`body`,`cat`,`authur`,`date`) VALUES (?)"
    const values = [
        title,
        img,
        slug,
        body,
        cat,
        authur,
        moment(Date.now()).format('YYYY-MM-DD HH')
    ]

    db.query(q,[values],(err,data) => {
        if (err) return next(err);
        const {cat, slug} = data[0]
        console.log(data[0])
        return res.status(200).json({cat:cat, slug:slug})
    })
}

export const updatePost = async (req, res, next) => {

    const q = "UPDATE posts SET `title`=?, `body`=?, `img`=?, `cat`=?, `slug`=? WHERE id=?"
    const values = [
        title,
        body,
        img,
        cat,
        slug
    ]

    db.query(q,[...values, req.params.id], (err, data) => {
        if(err) return next(err);
        const {cat, slug} = data[0];
        return res.status(200).json({cat:cat, slug:slug})
    })
   
}




export const deletePost = async (req, res, next) => {

    const q = "DELETE FROM posts WHERE `id` = ?"
    db.query(q,[req.params.id], (err,data) => {
        if(err) return next(err);
        return res.status(200).json("Post deleted")
    })


}
