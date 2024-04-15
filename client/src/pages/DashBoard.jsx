import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import  DashSidebar from '../components/DashSidebar'
import DashProfile from  '../components/DashProfile'
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
      <div className="md:w-56">
        {/*  DashSidebar  */}
        <DashSidebar/>
      </div>
      <div>
        {/*  DashProfile  */}
         {tab==='profile' && <DashProfile/>}
         
      </div>
    </div>
  )
}
