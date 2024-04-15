import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
export default function DashSidebar() {

    const location=useLocation();
   const [tab,settab]=useState('');
   useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    
    const urltab=urlParams.get('tab');
      if(urltab){
        settab(urltab)
      }
   },[location.search])
 
  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
     <Sidebar.ItemGroup>
     <Link to='/DashBoard?tab=profile'>
      <Sidebar.Item 
      
       active={tab==='profile'}
       icon={HiUser}
      label={'user'}
       labelColor='dark'               >
        Profile</Sidebar.Item>
        </Link>
        <Sidebar.Item 
         icon={HiArrowSmRight}
        >
        Logout</Sidebar.Item>
     </Sidebar.ItemGroup>
     
    </Sidebar.Items>
     
    </Sidebar>
  )
}
