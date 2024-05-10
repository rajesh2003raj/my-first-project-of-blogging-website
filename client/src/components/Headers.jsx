import { Link, useLocation,useNavigate} from "react-router-dom"
import { Navbar, Button,TextInput, Dropdown, Avatar}  from  "flowbite-react"
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import {  HiLogout } from "react-icons/hi";
import {useSelector} from 'react-redux';
import { useEffect,useState } from "react";
 import {toggleTheme} from '../redux/store/theme/themeSlice'
 import { signoutSuccess } from "../redux/store/user/userSlice";
 import { useDispatch } from "react-redux";

function Headers() {
    const dispatch=useDispatch();
    const {currentUser}=useSelector((state)=>state.user);
     const {theme}=useSelector((state)=>state.theme);
     const navigate=useNavigate();
  const path=useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
        navigate('/')
      }
          
    } catch (error) {
         console.log(error.message)
    }
  }

  return (
      
        <Navbar className="sticky top-0 z-50 border-b-2 bg-zinc-100">
         <Link to="/" className="self-center text-nowrap text-sm md:text-lg dark:text-white">
         <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
          to-pink-500 rounded-lg text-white
         ">Tech</span>Blog
         </Link>
         <form onSubmit={handleSubmit}>
           <TextInput
           type="text"
           placeholder="search...."
            rightIcon={AiOutlineSearch}
            className="hidden md:inline"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
           />
           </form>
           {/*  button for smallers  screen*/}
           <Button className="  w-12 h-9  md:hidden color='grap' pill      ">
             <AiOutlineSearch/>
           </Button>
         
           {/*  for dark and light screen  we create button and for signIn*/}
           <div className=" flex gap-2 md:order-2">
               <Button className= " items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 font-small rounded-xl  h-10 text-sm px-3 py-2 me-2 mb-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-3"
                onClick={()=>dispatch(toggleTheme())}
               >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
               </Button>
            
            {/* we have to signIn button */}
            {
              (currentUser)?(
                
                <Dropdown
                  arrowIcon={false}
                  inline
                  label= {<Avatar
                   alt="user"
                   img={currentUser.profilePicture}
                   rounded
                   />}
                   >
                   <Dropdown.Header>
                   
                   <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                 </Dropdown.Header>
                 
                 <Link to={'/dashboard?tab=profile'}>
                   <Dropdown.Item>@Profile</Dropdown.Item>
                 </Link>
                 <Dropdown.Divider />
                 <Dropdown.Item icon={HiLogout} onClick={handleSignout}>Sign out</Dropdown.Item>
               </Dropdown>
                   
                 
                 
                
              ):(
                <Link
                to="/signIn"
                 
                >
                 <Button gradientDuoTone="purpleToBlue"  className=" h-10 mt-3">SignIn</Button>
                </Link> 
              )
            }
            
      
            <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
            <Navbar.Link active={path==='/'} as={'div'}>
             <Link to="/">HOME</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/Contact'} as={'div'}>
            <Link to="/Contact">Contact us</Link>
           </Navbar.Link>
           <Navbar.Link active={path==='/About'} as={'div'}>
           <Link to="/About">About US</Link>
          </Navbar.Link>

            </Navbar.Collapse>
        </Navbar>
        
       

    
    
    
  )
}

export default Headers