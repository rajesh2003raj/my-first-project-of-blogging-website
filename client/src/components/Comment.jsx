import { useEffect, useState } from "react"
import moment from 'moment';
export default function Comments({comment}) {

    const [user ,setuser]=useState({});
    

    useEffect(()=>{
          
       
             const getComment= async()=>{

                try{
                 const  res= await fetch(`/api/v1/${comment.userId}`);
                 const data= await  res.json();
                 if(res.ok){
                    setuser(data)
                 }
            
            
        } catch (error) {
              console.log(error.message)
        }
    };
        getComment();
        
    },[comment]);


  return (

    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
    <div className='flex-shrink-0 mr-3'>
      <img
        className='w-10 h-10 rounded-full bg-gray-200'
        src={user.profilePicture}
        alt={user.userName}
      />
    </div>
    <div className='flex-1'>
      <div className='flex items-center mb-1'>
        <span className='font-bold mr-1 text-xs truncate'>
          {user ? `@${user.email}` : 'anonymous user'}
        </span>
        <span className='text-gray-500 text-xs'>
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>
        </div>
     
        <p className='text-gray-500 pb-2'>{comment.content}</p>
        
        </div>
  )
}
