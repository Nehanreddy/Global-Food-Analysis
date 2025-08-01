import React from 'react'
import Sidebar from '../components/Sidebar'

export default function Home() {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-[80%] flex flex-col items-center my-16'>
                <div className='text-[28px] outfit-600'>
                    Home
                </div>
            </div>
        </div>
    )
}
