import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import UserRegister from './Components/UserRegister';
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<UserRegister/>}/>
  </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
