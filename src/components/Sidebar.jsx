import React from 'react'
import dashIcon from '../images/dashboard.png'
import analysisIcon from '../images/analysis.png'
import indiIcon from '../images/indi.png'
import alertIcon from '../images/alert.png'
import progIcon from '../images/white-proglint.png'
import uniLogo from '../images/uniLogo.png'
import anamolyIcon from '../images/anamoly.png'
import { Link } from 'react-router-dom';
export default function Sidebar() {
    return (
        <div className='w-[20%] bg-[#1D1042] text-white'>
            <div className='my-10 mx-8 h-screen'>
                <div className='outfit-600  text-[#FFC416] text-[24px]'>
                Food Dashboard</div>
                <div className='mt-8 outfit-400'>
                    <Link to="/" className='flex'>
                        <img src={dashIcon} className='w-6' />
                        <div className='ml-4'>Dashboard</div>
                    </Link>
                    
                    
                    {/* <Link to="/individuals" className='flex mt-8'>
                        <img src={indiIcon} className='w-6' />
                        <div className='ml-4'>Individuals</div>
                    </Link> */}
                </div>
                <hr className='mt-8'></hr>
               
            </div>
        </div>
    )
}
