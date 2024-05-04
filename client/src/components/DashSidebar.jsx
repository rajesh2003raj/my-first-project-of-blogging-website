import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser,HiDocumentText,HiOutlineUserGroup} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { signoutSuccess } from '../redux/store/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
export default function DashSidebar() {
     
      const {currentUser}=useSelector((state)=> state.user); 

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
     <Sidebar.ItemGroup className='flex flex-col gap-1'>
     <Link to='/DashBoard?tab=profile'>
      <Sidebar.Item 
      
       active={tab==='profile'}
       icon={HiUser}
      label={currentUser.isAdmin? 'Admin' : 'User'}
       labelColor='dark' 
       as='div'              >
        Profile</Sidebar.Item>
        </Link>
        {/*   side bar post */}
        {
          currentUser.isAdmin && (
            <Link to='/DashBoard?tab=posts'>
            <Sidebar.Item
            active={tab==='posts'}
            label={currentUser.isAdmin ? 'Admin' : 'User'}
            icon={HiDocumentText}
            as='div'>
             Posts
            </Sidebar.Item>
            
            </Link>
          )
        }
        {/*   side bar user */}   {
          currentUser.isAdmin && (
            <Link to='/DashBoard?tab=users'>
            <Sidebar.Item
            active={tab==='users'}
            label={currentUser.isAdmin ? 'Admin' : 'User'}
            icon={HiOutlineUserGroup}
            as='div'>
             Users
            </Sidebar.Item>
            
            </Link>
          )
        }
    
        {
          currentUser.isAdmin && (
            <Link to='/DashBoard?tab=comments'>
            <Sidebar.Item
            active={tab==='comments'}
            label={currentUser.isAdmin ? 'Admin' : 'User'}
            icon={HiDocumentText}
            as='div'>
             Comments
            </Sidebar.Item>
            
            </Link>
          )
        }

       
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
