import { prisma } from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const ProfileCard=async()=> {

  
    const { userId } = await auth();
   
   if(!userId)return null;

   const user=await prisma.user.findFirst({
      where:{
         id:userId,
      },
      include:{
         _count:{
            select:{
               followers:true
            }
         }
      }
   })
    console.log(user)
    if(!user)return null;


  return (
    <div className='flex flex-col gap-4 rounded-lg shadow-md text-sm'>
       <div className='h-20 relative'>
          <Image 
          src={user.cover||'/noCover.png'} 
          alt='profile' fill className='rounded-md object-cover'  
          sizes="(max-width: 768px) 100vw, 700px"
          loading="eager"/>
          <Image src={user.avatar||'/noAvatar.png'}  alt='profile'
          width={48} height={48} className='rounded-full h-12 w-12 object-cover absolute left-0 right-0 m-auto -bottom-6  z-10'/>
       </div>

       <div className='flex flex-col items-center gap-2 mt-8'>
          <span className='font-semibold text-md'>{(user.name && user.surname)?user.name+" "+user.surname:user.username}</span>
          <span>{user._count.followers}</span>
          <Link href={`/profile/${user.username}`} className='bg-blue-500 text-sm text-white flex justify-center items-center px-4 rounded-md py-1 cursor-pointer mb-2'>My Profile</Link>
       </div>
    </div>
  )
}

export default ProfileCard