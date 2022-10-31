import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import avatar from '../assets/img/avatar.png';
import instance from '../config/axios';
import { AuthContext } from '../context/authContext';
import Divider from '@mui/material/Divider';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {authur} = useParams()
    useEffect(()=> {
        const fetchpost = async () => {
        try{
            const res = await instance.get(`posts/userposts/${authur}`)
            const {posts, totalP} = res.data
            setPosts(posts)
        }catch(err){
            console.log(err)
        }
    }
    fetchpost()
    },[])
    return (
        <div className='profilePage'>
            <div className='profileP'>
                <div className='profile'>
                    <img className="pic" src={avatar} alt=""/>
                    <div className='info'>
                    <h3>{authur}</h3>
                    <p>Joined: 19th August</p>
                    </div>
                </div>

            </div>
            <div className='profile-blog'>
            <h3>Published Posts</h3>
            <Divider/> 
            <div className='blog-content'>
           
            {posts?.map(post => (
                <div className='content' key={post._id}>
               
                <div className='l-content'>
                <div className='profile'> 
                {currentUser?.profilepic?
                        <img src={currentUser.profilepic} alt="account" />
                        :
                        <img src={avatar} alt="account" /> 
                }
    <div className='info'>
        <span>{post.authur}</span>    
     </div>
  </div>
  <Link to={`/${post.cat}/${post.slug}`}>
  <h3>{post.title}
  </h3>
  </Link>

  </div>
  <div className='r-content'>
  <img src={post?.img} alt=""/>
  </div>
  </div>
            ))}
            </div>
            </div>
        </div>
    );
};

export default Profile;