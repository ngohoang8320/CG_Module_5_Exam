import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRouters from './routers/AppRoutes';

function App() {
  return (
    <>
      <AppRouters />
      <ToastContainer />
    </>
  );
}

export default App;
