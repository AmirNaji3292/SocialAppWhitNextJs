import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Ad({size}:{size:"sm"|"md"|"lg"}) {
  return (
    <div className='p-4 rounded-lg shadow-md text-sm bg-white gap-4'>
       
       <div className='flex justify-between '>
        <span className='text-gray-500 text-sm'>Sponsored Ads</span>
        <Image src="/more.png" alt='more'   className="w-5 h-5" width={16} height={16}/>
       </div>
  
        <div className={`bg-slate-100 mt-2 relative ${size==='sm'?'h-24':size==='md'?'h-36':'h-48'}`}>
           <Image src='/pexels-ozge-alpaslan-354415780-32869693.jpg'
            alt='photo'
            fill
             loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            className='object-cover '/>
        </div>


        <div className='flex mt-4 gap-2 flex items-center'>
          <Image   sizes="(max-width: 768px) 100vw, 50vw"
           loading="eager"
          src='/pexels-ozge-alpaslan-354415780-32869693.jpg'
            alt='photo' width={20} height={20} className='object-cover aspect-square  rounded-xl'/>
            <Link href='/' className='text-blue-600 text-sm '>Obulaga adi</Link>
        </div>




        <div className='mt-2 mb-2 text-gray-600'>
           <p className={size==='sm'?'text-xs':'text-sm'}>
              {
                size==='sm'? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo ullam aliquid reiciendis eveniet "
                :size==='md'?"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste est perferendis inventore cumque sequi tempore animi illum deleniti nesciunt molestias "
                :"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste est perferendis inventore cumque sequi tempore animi illum deleniti nesciunt molestiasLorem ipsum dolor sit amet consectetur adipisicing elit. Iste est perferendis inventore cumque sequi tempore animi illum deleniti nesciunt molestias "
                
              }
           </p>
        </div>

        <div>
           <button className='bg-slate-100 rounded-2xl w-full flex justify-center p-1 cursor-pointer text-gray-500'>learn more</button>
        </div>

    </div>
  )
}

export default Ad