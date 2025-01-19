import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
    
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
