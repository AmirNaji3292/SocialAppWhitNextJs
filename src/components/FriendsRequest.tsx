import { prisma } from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FriendRequestList from './FriendRequestList'

async function FriendsRequest() {
   
     const {userId}=await auth()
       
  



     if(!userId)return null;

     const Nrequests=await prisma.followRequest.findMany({
        where:{
            receiverId:userId,
        },
        include:{
            sender:true,
        }
     })

 
       if (Nrequests.length === 0) {
  return (
    <div className="p-4 bg-white rounded-lg">
      No friend requests
    </div>
  );
}



  return (
    <div className='p-4 rounded-lg shadow-md text-sm bg-white'>
        
        {/* top */}
        <div className='flex justify-between'>
            <span className='text-sm text-gray-500 font-semibold'>Friend Requests</span>
            <Link className='text-blue-500' href='/'>see all</Link>
        </div>
       
        {/* users */}
        <div className='flex justify-between items-center mt-3'>
            <FriendRequestList requests={Nrequests}/>
           </div>
        
    </div>
  )
}

export default FriendsRequest