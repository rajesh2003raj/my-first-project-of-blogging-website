import { Link, useLocation} from "react-router-dom"
import { Navbar, Button,TextInput, Dropdown, Avatar}  from  "flowbite-react"
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import {  HiLogout } from "react-icons/hi";
import {useSelector} from 'react-redux';
 import {toggleTheme} from '../redux/store/theme/themeSlice'
 import { useDispatch } from "react-redux";
function Headers() {
    const dispatch=useDispatch();
    const {currentUser}=useSelector((state)=>state.user);
     const {theme}=useSelector((state)=>state.theme);
  const path=useLocation().pathname;
  return (
    <>   
        <Navbar className="sticky top-0 z-50">
         <Link to="/" className="self-center text-nowrap text-sm md:text-lg dark:text-white">
         <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
          to-pink-500 rounded-lg text-white
         ">Rajesh</span>Blog
         </Link>
         <form>
           <TextInput
           type="text"
           placeholder="search...."
            rightIcon={AiOutlineSearch}
            className="hidden md:inline"
           />
           </form>
           {/*  button for smallers  screen*/}
           <button className=" pl-4 w-12 h-9  md:hidden bg-gray-700 rounded-lg">
             <AiOutlineSearch/>
           </button>
         
           {/*  for dark and light screen  we create button and for signIn*/}
           <div className=" flex gap-2 md:order-2">
               <Button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 font-small rounded-xl  h-11 text-sm px-3 py-2 me-2 mb-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
                 
                 <Link to={'/'}>
                   <Dropdown.Item>@Profile</Dropdown.Item>
                 </Link>
                 <Dropdown.Divider />
                 <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
               </Dropdown>
                   
                 
                 
                
              ):(
                <Link
                to="/signIn"
                 
                >
                 <Button gradientDuoTone="purpleToBlue" >SignIn</Button>
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
        
       

    
    
    </>
  )
}

export default Headers