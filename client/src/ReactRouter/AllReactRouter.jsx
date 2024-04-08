import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import Layout from "../Layout.jsx/layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="About" element={<AboutPage />}>
        {/* Nested route for "About" page */}
        <Route path="product" element={<div> Hello world </div>} />
      </Route>
      <Route path="SignIn" element={<SignInPage />} />
      <Route path="SignUp" element={<SignUpPage />} />
      <Route path="Admin" element={<AdminPanelPage />} />
      <Route path="*" element={<div>Page not found!</div>} />
    </Route>
  )
);

export default router;
