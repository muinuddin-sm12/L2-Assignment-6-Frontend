import React from 'react'
import Connect_icon from '@/assets/connections_icon.png'
import Image from 'next/image'

const GetInTouch = () => {
  return (
    <div className='pt-20 px-6 md:px-12 lg:px-20'>
        <div className="pb-10">
        <h1 className="text-4xl font-[700]">
        Get In  <br/><span className="flex items-center gap-2"><Image src={Connect_icon} height={40} width={40} alt="connect-icon"/>Touch</span>
        </h1>
      </div>

      <div>
        content
      </div>
         
    </div>
  )
}

export default GetInTouch