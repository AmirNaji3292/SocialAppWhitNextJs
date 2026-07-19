import React from 'react'
import Post from './Post'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/client';

 async function FeedPage({username}:{username?:string}) {
    
     const {userId}=await auth()

     let posts:any[]=[];

     if(username){
      posts=await prisma.post.findMany({
        where:{
          user:{username:username},
        },
        include:{
          user:true,
          likes:{
            select:{
              userId:true,
            }
          },_count:{
          select:{comments:true}
        }
        },
        orderBy:{
          createdAt:'desc',
        }
      })
     }


       if(!username && userId){
        const following=await prisma.follower.findMany({
          where:{
            followerId:userId,
          },select:{
            followingId:true,
          }
        })


        const followingIds=following.map((f)=>f.followingId)
        const ids=[userId,...followingIds]
        posts=await prisma.post.findMany({
          where:{
            userId:{in:ids}
          },
            include:{
          user:true,
          likes:{
            select:{
              userId:true,
            }
          },_count:{
          select:{comments:true}
        }
        },
        orderBy:{
          createdAt:'desc',
        }
        })
       }




  return (
    <div className='shadow-md p-4 flex flex-col gap-12 bg-white'>
      {posts.length? (posts.map(post=><Post key={post.id} post={post}/>)) :"No Posts Finded."}
      
    </div>
  )
}

export default FeedPage