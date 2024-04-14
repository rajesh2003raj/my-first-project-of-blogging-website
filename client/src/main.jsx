
import ReactDOM from 'react-dom/client'
import {store} from './redux/store/store.js'
import {Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './components/ThemeProviders.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <ThemeProvider >
       <App/>
     </ThemeProvider>
      
   </Provider>
)
