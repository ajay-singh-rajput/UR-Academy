import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './components/store/store.tsx'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
  
    <App />
  <ToastContainer/>
  </BrowserRouter>
  </Provider>,
)
