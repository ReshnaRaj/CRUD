
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Adduser from './components/Adduser';
import Edituser from './components/Edituser';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/adduser' element={<Adduser/>}/>
      <Route exact path='/edituser/:id' element={<Edituser/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
