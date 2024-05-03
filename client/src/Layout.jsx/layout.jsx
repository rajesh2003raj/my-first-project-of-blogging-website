
import {Outlet} from 'react-router-dom'
import  Headers from "../components/Headers"
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScroolTotop'

/* outlet is useful for fixing any components at any place that does not change */
function layout() {
  return (
    <>   <ScrollToTop/>
         <Headers/>
       <Outlet/>
       <Footer/>
     </>
  )
}

export default layout