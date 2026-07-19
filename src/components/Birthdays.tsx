import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Birthdays() {
  return (
    <div className='p-4  rounded-lg shadow-md text-sm bg-white'>
      
      
     
        <div className='flex justify-between'>
            <span className='text-sm text-gray-500 font-semibold'>Birthday</span>
        </div>
       
        {/* users */}
        <div className='flex justify-between items-center mt-3 gap-4'>
            <div className='flex gap-1 justify-center items-center'>
                 <Image src='/kevin-oetiker-v17IhTzLICs-unsplash.jpg' alt='user' width={30} height={30} className='object-cover aspect-square rounded-full'/>
            <span className='font-semibold'>user</span>
            </div>

              <div className='flex gap-2 mt-2 p-2'>
                 <button className='bg-blue-400 p-1 text-white cursor-pointer  rounded-md'>Celebrate</button>
              </div>
        </div>
        
         {/* prise section */}
          
           <div className='flex bg-slate-100 gap-3 py-3 rounded-xl text-xs text-gray-500'>
               <Image src='/gift.png'  className="w-5 h-5" alt='gift' width={30} height={30}/>
               <div className='flex flex-col gap-2'>
                <span className='font-semibold'>Upcommings Birthday</span>
               <span>see other 17 have Birthday</span>
               </div>
           </div>
      
      
    </div>
  )
}

export default Birthdays