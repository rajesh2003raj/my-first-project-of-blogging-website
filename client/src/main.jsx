
import ReactDOM from 'react-dom/client'
import {persistor, store} from './redux/store/store.js'
import {Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './components/ThemeProviders.jsx'

import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')).render(

  <PersistGate persistor={persistor}>
   <Provider store={store}>
   <ThemeProvider >
  
       <App />
     </ThemeProvider>
      
   </Provider>
   </PersistGate>
)
