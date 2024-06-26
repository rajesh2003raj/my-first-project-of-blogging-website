import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import  DashSidebar from '../components/DashSidebar'
import DashProfile from  '../components/DashProfile'
import DashPost from "../components/DashPost";
import DashUser from "../components/DashUser";
import DashComments from "../components/Dashcomment";
import Dashboard from "../components/Dashboard";

export default function DashBoard() {
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
    <div className=" min-h-screen flex flex-col md:flex-row">
      <div >
        {/*  DashSidebar  */}
        <DashSidebar/>
      </div>
      
        {/*  DashProfile  */}
         {tab==='profile' && <DashProfile/>}
         {/*   posts*/ }
        { tab==='posts'  && <DashPost/>}
        {tab==='users' && <DashUser/>}

        { /* comments*/}
        { tab=== 'comments' && <DashComments/>}

        {/*  dash board */}
        { tab==='dash'  && <Dashboard/>}
         
    </div>
  )
}
