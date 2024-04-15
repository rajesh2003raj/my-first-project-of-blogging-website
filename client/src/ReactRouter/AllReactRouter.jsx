import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import Layout from "../Layout.jsx/layout";
import DashBoard from "../pages/DashBoard";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="About" element={<AboutPage />}/>
      <Route path="SignIn" element={<SignUpPage />} />
      <Route path="SignUp" element={<SignInPage />} />
      
      <Route path='/dashboard' element={<DashBoard />} />
    
      <Route path="Admin" element={<AdminPanelPage />} />
      <Route path="*" element={<div>Page not found!</div>} />
       
    </Route>
    
  )
);

export default router;
