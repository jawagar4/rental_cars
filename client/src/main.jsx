import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import { CarProvider} from './Context/CarContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<CarProvider>
  <App />
</CarProvider>
  </BrowserRouter>,
)
