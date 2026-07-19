import Image from 'next/image'
import React from 'react'
import Comment from './Comment'
import { Post as PostType, User } from '@prisma/client'
import PostInterAction from './PostInterAction'
import PostInfo from './PostInfo'
import { auth } from '@clerk/nextjs/server'

type FeedPostType=PostType & {user:User} & {likes:[{userId:string}]} &{_count:{comments:number}}

async function Post({post}:{post:FeedPostType}) {
    
   const {userId}=await auth()

  return (
    <div className='flex flex-col gap-4'>
        {/* user */}
        <div className='flex justify-between '>
           <div className='flex gap-2 justify-center  items-center'>
             <Image src={post.user.avatar || '/noAvatar.png'} alt="user" width={50} height={50} className='object-cover aspect-square rounded-full'/>
            <span>{(post.user.name && post.user.surname)?post.user.name+" "+post.user.surname : post.user.username}</span>
           </div>
               
         {userId ==post.user.id && <PostInfo postId={post.id}/>}
        </div>

        {/* description */}
      { post.img? <div className='flex flex-col gap-4 '>
            <Image src={post.img}alt='post' width={200} height={200} 
            className='objectiv-cover w-full h-[80%] rounded-lg'
             loading="eager"
            />
            </div>
            :""}

          
        
        {post.desc?<p>{post.desc}</p>:""} 



       { /* interactions */}
       <PostInterAction postId={post.id} likes={post.likes.map((like)=>like.userId)} commentNumber={post._count.comments}/>
          
        <Comment postId={post.id}/>
        <hr className='font-bold text-blue-500 shadow-md'/>
    </div>
  )
}

export default Post