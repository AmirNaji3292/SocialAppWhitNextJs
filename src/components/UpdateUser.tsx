'use client'
import { updateProfile } from '@/lib/action'
import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useActionState, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import UpdaeProfileBtn from './UpdaeProfileBtn'


function UpdateUser({user}:{user:User}) {

   const[open,setOpen]=useState(false)
   const[cover,setCover]=useState<any>(false)

  const handleClose=()=>{
    setOpen(false)
  }
  
  const[state,formAction]=useActionState(updateProfile,{success:false,error:false})

  return (
    <div>
        <span className='text-blue-500 text-md cursor-pointer'onClick={()=>setOpen(true)}>Update</span>

       {open &&
         <div className='absolute w-screen h-screen top-0 left-0 flex justify-center items-center  bg-gray-300/50 z-50 '>

            <form action={(formData)=>formAction({formData,cover:cover?.secure_url||""})} className='flex flex-col bg-white p-12 shadow-md rounded-md gap-2 w-full md:w-1/2 xl:w-1/3 relative'>
                
                <h1>Update Profile</h1>
                <div className='mt-4 text-gray-500 text-xs'>
                    Use the navbar profile to change the avatar or profile.
                </div>
               

          <CldUploadWidget uploadPreset="socialApp" 
          onSuccess={(result)=>setCover(result.info)}>
             {({ open }) => {
              return (<div>

                <div className='flex flex-col gay-4 my-4'onClick={() => open()}>
                    <label htmlFor=''>Cover Picture</label>
                    <div className='flex  items-center gap-2 mt-3 cursor-pointer'>
                        <Image src={user.cover || '/noAvatar.png'} alt='' width={48} height={32} className='w-12 h-8 object-cover rounded-md'/>
                        <span className='text-xs text-gray-600 underline'>Change</span>
                    </div>
                </div>

               {/* <button onClick={() => open()}>
                   Upload an Image
                </button> */}
              </div>
              );
              }}
          </CldUploadWidget>

                   

               {/* Inputs */}

                <div className='flex flex-wrap gap-2 justify-between Xl:gap-4'>


                     <div className='flex flex-col gap-2'>
                        <label className='text-xs text-gray-500'>FirstName</label>
                        <input name='name' className='ring-1 ring-gray-300 rounded-md p-[8px] text-sm' type='text' placeholder={user.name || 'John'}/>
                     </div>


                      <div className='flex flex-col gap-2'>
                        <label className='text-xs text-gray-500'>SurName</label>
                        <input name='surname' className='ring-1 ring-gray-300 rounded-md p-[8px] text-sm' type='text' placeholder={user.surname || 'John'}/>
                     </div>

      

                       <div className='flex flex-col gap-2'>
                        <label className='text-xs text-gray-500'>
                            Description
                        </label>
                        <input name='description' className='ring-1 ring-gray-300 rounded-md p-[8px] text-sm' type='text' placeholder={user.description || 'Life is beautiful...'}/>
                     </div>
 
                         <div className='flex flex-col gap-2'>
                        <label className='text-xs text-gray-500'>City</label>
                        <input name='city' className='ring-1 ring-gray-300 rounded-md p-[8px] text-sm' type='text' placeholder={user.city || 'tehran'}/>
                     </div>
    
                         <div className='flex flex-col gap-2'>
                        <label className='text-xs text-gray-500'>School</label>
                        <input name='school' className='ring-1 ring-gray-300 rounded-md p-[8px] text-sm' type='text' placeholder={user.school || 'MIT'}/>
                     </div>
                        

                         <div className='flex flex-col gap-2'>
                        <label className='text-xs text-gray-500'>Work</label>
                        <input name='work' className='ring-1 ring-gray-300 rounded-md p-[8px] text-sm' type='text' placeholder={user.work || 'developer'}/>
                     </div>

                     <div className='flex flex-col gap-2'>
                        <label className='text-xs text-gray-500'>Website</label>
                        <input name='website' className='ring-1 ring-gray-300 rounded-md p-[8px] text-sm' type='text' placeholder={user.website || 'amir.dev'}/>
                     </div>



                </div>
              {state.success && <span className='text-green-500'>Updated Profile Was Successfull.</span>}
              {state.error && <span className='text-red-500'>Some Thing Went Wrong.</span>}

              <UpdaeProfileBtn/>
                 {/* <button className='bg-blue-500 p-2 mt-2 rounded-md text-white cursor-pointer'>Update</button> */}
             
               
             

               {/* closedItem */}
                <div  onClick={handleClose} className='text-xl text-red-500 absolute top-2 right-3 cursor-pointer font-semibold'>X</div>
            </form>
        </div>
       }
    </div>
  )
}

export default UpdateUser