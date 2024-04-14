import { Link  ,useNavigate } from "react-router-dom"
import { Alert ,Button, Label, TextInput,Spinner} from "flowbite-react"
import { useState  } from "react"
import Oauth from "../components/Oauth";
export default function SignUpPage() {


 const [formData ,setformData]=useState({});
 const [errorMessage, setErrorMessage] = useState(null);
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const handleChange=(e)=>{
    setformData({...formData,[e.target.id]:e.target.value})

  };
  const handleSumbit= async (e)=>{
    e.preventDefault();
     if(!formData.userName || ! formData.email || !formData.password){
           return setErrorMessage('please fill out all fields')
     }
     try{
        setLoading(true)
        setErrorMessage(null)
       const  res= await fetch('/api/v1/signup',{
          method:'POST',
          headers:{ 'Content-Type':'application/json'},
          body:JSON.stringify(formData)
          
       })
       const data=await res.json();
       if(data.sucess===false){
        return setErrorMessage('userName or email already exits')
       }
        setLoading(false)
        if(res.ok){
          navigate('/SignUp')
        }
     }
     catch(err){
         return setErrorMessage(err.message),
         setLoading(false)
     } 
    
  };




  return (
    
    <div className="min-h-screen mt-20">
     
     <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/* left components */}
      <div className="flex-1">
      <Link to="/" className=" text-sm md:text-lg dark:text-white">
      <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
       to-pink-500 rounded-lg text-white
      ">Rajesh</span>Blog
      </Link>
       <p>
        Here we can share yours experience
       </p>
      </div>
      {/* right components */}
       <div className="flex-1 ">
           <div>
             <form  onSubmit={handleSumbit} className="flex flex-col gap-4">
               <div>
                 <Label value="userName"/>
                 <TextInput
                 type="text"
                 placeholder="userName..."
                 id="userName"
                   
                 onChange={handleChange}
                 />
               </div>
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
                 placeholder="Passsword........."
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
                ('SignUp')
               }

              

            </Button>
            <Oauth/>
             </form>
               
             <div className='flex gap-2 text-sm mt-5'>
             <span>Have an account?</span>
             <Link to='/signUp' className='text-blue-500'>
               Sign In
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