import { Link, useLocation} from "react-router-dom"
import { Navbar, Button,TextInput, Dropdown, Avatar}  from  "flowbite-react"
import { FaSearch  } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import {  HiLogout } from "react-icons/hi";
import {useSelector} from 'react-redux'
function Headers() {

    const {currentUser}=useSelector((state)=>state.user);

  const path=useLocation().pathname;
  return (
    <>   
        <Navbar className="bg-slate-800 sticky top-0 z-50">
         <Link to="/" className="self-center text-nowrap text-sm md:text-lg dark:text-white">
         <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
          to-pink-500 rounded-lg text-white
         ">Rajesh</span>Blog
         </Link>
         <form>
           <TextInput
           type="text"
           placeholder="search...."
            rightIcon={FaSearch}
            className="hidden md:inline"
           />
           </form>
           {/*  button for smallers  screen*/}
           <button className=" pl-4 w-12 h-9  md:hidden bg-gray-700 rounded-lg">
             <FaSearch/>
           </button>
         
           {/*  for dark and light screen  we create button and for signIn*/}
           <div className=" flex gap-2 md:order-2">
               <Button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 font-small rounded-xl  h-11 text-sm px-3 py-2 me-2 mb-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
               <MdDarkMode/>
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