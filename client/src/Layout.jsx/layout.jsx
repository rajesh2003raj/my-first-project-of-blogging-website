
import {Outlet} from 'react-router-dom'
  

/* outlet is useful for fixing any components at any place that does not change */
function layout() {
  return (
    <>
     
       <Outlet/>
     </>
  )
}

export default layout