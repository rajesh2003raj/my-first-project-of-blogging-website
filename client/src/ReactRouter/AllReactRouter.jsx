import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import Layout from "../Layout.jsx/layout";
import DashBoard from "../pages/DashBoard";
import PrivateRoute from "../components/PrivateRoute";
import OnlyAdminPrivate from "../components/OnlyAdminPrivate"
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="About" element={<AboutPage />}/>
      <Route path="SignIn" element={<SignUpPage />} />
      <Route path="SignUp" element={<SignInPage />} />
      
      {/* here we write private Router */}
    
        <Route element={<PrivateRoute/>}>
           <Route path="/dashBoard" element={<DashBoard/>}/>
        </Route>  
       <Route element={<OnlyAdminPrivate/>}>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:postId" element={<UpdatePost/>}/>
        
       </Route>  
      
      <Route path="*" element={<div>Page not found!</div>} />
       
    </Route>
    
  )
);

export default router;
