  import React from 'react'

  import LeftMenue from '@/components/LeftMenue'
  import RightMenue from '@/components/RightMenue'
  import FeedPage from '@/components/FeedPage'
  import Image from 'next/image'
  import { prisma } from '@/lib/client'
  import { notFound } from 'next/navigation'
  import { auth } from '@clerk/nextjs/server'


  async function ProfilePage({params}: {params: Promise<{ username: string }>;

}) {
         const { username } = await params;

         
            
             

                   const {userId:currentUserId}=await auth()
              console.log("Current Clerk User:", currentUserId);

                if (!currentUserId) return notFound();



            const user= await prisma.user.findFirst({
              where:{username},
              include:{
                _count:{
                  select:{
                    followers:true,
                    followings:true,
                    posts:true,
                  }
                }
              }
            })
        if(!user)return notFound()

    
          let isBlocked;

          if(currentUserId){
            const res=await prisma.block.findFirst({
              where:{
                blockerId:user.id,
                blockedId:currentUserId,
              }
            })
            if(res) isBlocked=true;
          }else{
            isBlocked=false;
          }
          
          if(isBlocked)return notFound();

    return (
      <div className="flex gap-4 pt-3">
          <div className="hidden lg:block w-[25%] ">
            <LeftMenue type="home"/></div>
          <div className="w-full sm:w-[60%] bg-gray-100">
          
            
            
            <div className='flex flex-col justify-center items-center'>
                <div className='w-full h-64 relative'>
                  <Image src={user.cover||'/kevin-oetiker-v17IhTzLICs-unsplash.jpg'} alt='profile' fill className='rounded-md object-cover'/>
                  <Image src={user.avatar||'/manja-vitolic-gKXKBY-C-Dk-unsplash.jpg'} alt='profile'
                            width={112} height={112} className='rounded-full h-28 w-28 object-cover absolute left-0 right-0 m-auto -bottom-14  z-10'/>
                </div>
                  <div className='flex justify-center items-center mt-15'>
                      <span className='font-bold bg-gray-300 px-2 rounded-md'>{(user.name && user.surname)?user.name+" "+user.surname:user.username}</span>
                  </div>
                  

                  <div className='flex gap-8 mb-4 mt-4'>
                      <div className='flex flex-col justify-center items-center gap-1'>
                      <span>posts</span>
                      <span className='font-semibold text-xl'>{user._count.posts}</span>
                  </div>

                  <div className='flex flex-col justify-center items-center'>
                      <span>followers</span>
                      <span className='font-semibold text-xl'>{user._count.followers}</span>
                  </div>


                  <div className='flex flex-col justify-center items-center'>
                      <span>following</span>
                      <span className='font-semibold text-xl'>{user._count.followings}</span>
                  </div>
                  </div>
            </div>



            <div className="flex gap-3 flex-col">
            
              
              <FeedPage username={user.username}/>
            </div>
          </div>
          <div className="hidden sm:block w-[35%] "><RightMenue user={user }/></div>
      </div>
    )
  }

  export default ProfilePage