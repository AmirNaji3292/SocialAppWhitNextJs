"use client"

import { deletePost } from '@/lib/action'
import Image from 'next/image'
import React, { useState } from 'react'

function PostInfo({postId}:{postId:number}) {

    const [open,setOpen]=useState(false)

    const deletePostWithId=deletePost.bind(null,postId)

  return (
    <div className='relative'>
        <Image className='cursor-pointer w-5 h-5' src='/more.png' height={20} width={20} alt='more'
        onClick={()=>{setOpen(prev=>!prev)}}
        />
        {open && (<div className='absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 shadow-md z-30'>
            <span className='cursor-pointer'>viow</span>
            <span className='cursor-pointer'>re-post</span>
            <form action={deletePostWithId}>
                 <button className='text-red-500 '>delete</button>
            </form>
        </div>)

        }
     
    </div>
  )
}

export default PostInfo