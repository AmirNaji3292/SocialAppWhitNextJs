
"use client"
import { switchBlock, switchFollow } from '@/lib/action';
import React, { useState } from 'react'

function UserInfoCardInteraction({userId,currentUserId,isUserBlocked,isFollowing,isFollowingSent}:{
    userId:string;
    currentUserId:string;
    isUserBlocked:boolean;
    isFollowing:boolean;
    isFollowingSent:boolean;
}){

const[userState,setUserState]=useState({
  following:isFollowing,
  blocked:isUserBlocked,
  followingRequestSent:isFollowingSent
})


 const follow=async()=>{
  try {
   await switchFollow(userId)
   setUserState((prev)=>({
    ...prev,
    following:prev.following && false,
    followingRequestSent:!prev.following && !prev.followingRequestSent?true:false,
   }))
  } catch (error) {
     console.log(error)
  }
 }



 const block=async()=>{
  try {
    await switchBlock(userId);
    setUserState((prev)=>({
      ...prev,
      blocked:!prev.blocked
    }))
  } catch (error) {
    console.log(error)
  }
 }

  return (
    <div>

       <form action={follow}>
         <button className='bg-blue-500 text-white rounded-md text-sm p-2 w-full cursor-pointer'>
        {userState.following?'Following':userState.followingRequestSent?"Friend Request Send":"Follow"}
        </button>
       </form>

       <form action={block}>

        <button className='text-red-400 cursor-pointer self-end text-sm mt-2'>
           {userState.blocked?"UnBlock the User":"Block User"}
        </button>
       </form>
    </div>
  )
}

export default UserInfoCardInteraction