import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { signoutSuccess } from '../redux/store/user/userSlice';
import { useDispatch } from 'react-redux';
export default function DashSidebar() {
   const dispatch= useDispatch()
    const location=useLocation();
   const [tab,settab]=useState('');
   useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    
    const urltab=urlParams.get('tab');
      if(urltab){
        settab(urltab)
      }
   },[location.search])

   const handleSignout=async()=>{
            
    try {
          const res= await fetch('/api/v1/signout',{
            method:'POST'
          });

      const data=  await res.json();
      if(!res.ok){
         console.log(data.message)
      } 
      else{
        dispatch(signoutSuccess(data))
      }
          
    } catch (error) {
         console.log(error.message)
    }
  }

 
  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
     <Sidebar.ItemGroup>
     <Link to='/DashBoard?tab=profile'>
      <Sidebar.Item 
      
       active={tab==='profile'}
       icon={HiUser}
      label={'user'}
       labelColor='dark' 
       as='div'              >
        Profile</Sidebar.Item>
        </Link>
        <Sidebar.Item 
         icon={HiArrowSmRight}
         onClick={handleSignout}
        >
        Logout</Sidebar.Item>
     </Sidebar.ItemGroup>
     
    </Sidebar.Items>
     
    </Sidebar>
  )
}
