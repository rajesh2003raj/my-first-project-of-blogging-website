import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import  Search from '../pages/Search'
import Layout from "../Layout.jsx/layout";
import DashBoard from "../pages/DashBoard";
import PrivateRoute from "../components/PrivateRoute";
import OnlyAdminPrivate from "../components/OnlyAdminPrivate"
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import PostPage from "../pages/PostPage";
import Contact from "../pages/Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<Layout />}>
    
      <Route path="" element={<HomePage />} />
      <Route path="About" element={<AboutPage />}/>
      <Route path="Contact" element={<Contact/>}/>
      <Route path="SignIn" element={<SignUpPage />} />
      <Route path="SignUp" element={<SignInPage />} />
      <Route path="/search" element={<Search/>}/>
      {/* here we write private Router */}
    
        <Route element={<PrivateRoute/>}>
           <Route path="/dashBoard" element={<DashBoard/>}/>
        </Route>  
       <Route element={<OnlyAdminPrivate/>}>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:postId" element={<UpdatePost/>}/>
        
       </Route>  
        <Route path="/post/:postSlug"  element={<PostPage/>}/>

       
    </Route>
    
  )
);

export default router;
