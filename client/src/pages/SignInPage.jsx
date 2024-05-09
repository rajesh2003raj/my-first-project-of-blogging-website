import { Link  ,useNavigate } from "react-router-dom"
import { Alert ,Button, Label, TextInput,Spinner} from "flowbite-react"
import { useState  } from "react"
import Oauth from "../components/Oauth"
import {signInstart ,signInFailure,signInSuccess} from '../redux/store/user/userSlice'
 import {useDispatch,useSelector} from 'react-redux'

export default function SignUpPage() {
  const dispatch=useDispatch()

 const [formData ,setformData]=useState({});
 const {loading ,error:errorMessage}=useSelector((state)=>state.user);
 const navigate=useNavigate()
  const handleChange=(e)=>{
    setformData({...formData,[e.target.id]:e.target.value.trim()})

  };
  const handleSumbit= async (e)=>{
    e.preventDefault();
   
    
     if( ! formData.email || !formData.password ){
           return  dispatch(signInFailure('All fields are mandatory'))
     } 

     try{
      dispatch(signInstart())
     const  res= await fetch('/api/v1/signin',{
        method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(formData)
        
     })
     const data=await res.json();
     if(data.success===false){
           dispatch(signInFailure(data.message))
     }
      
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
   }
   catch(error){
      dispatch(signInFailure(error.message))
  }
}
     




  return (
    
    <div className="min-h-screen mt-20">
     
     <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/* left components */}
      <div className="flex-1">
      <Link to="/" className=" text-sm md:text-lg dark:text-white">
      <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
       to-pink-500 rounded-lg text-white
      ">Tech</span>Blog
      </Link>
       <p>
       Here we can find web development articles 
       </p>
      </div>
      {/* right components */}
       <div className="flex-1 ">
           <div>
             <form  onSubmit={handleSumbit} className="flex flex-col gap-4">
                
               <div>
               <Label value="Yours email "/>
               <TextInput
               type="email"
               placeholder="Rajesh@gmail.com"
               id="email"
               onChange={handleChange}
               />
             </div>
             <div>
                 <Label value="Password"/>
                 <TextInput
                 type="password"
                 placeholder="*******************......."
                 id="password"
                 onChange={handleChange}
                 />
               </div>
               <Button 
               type="submit"
               gradientDuoTone='purpleToPink'
               disabled={loading}
               >
               {
                loading ?(
                  <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                  </>
                ):
                ('SignIn')
               }

            </Button>
            <Oauth/>
             </form>
              
             <div className='flex gap-2 text-sm mt-5'>
             <span>Dont Have an account?</span>
             <Link to='/signIn' className='text-blue-500'>
               SignUp
             </Link>
           </div>
             {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}
           </div> 
       </div>
     </div>
       
    </div>
      
  )
}
