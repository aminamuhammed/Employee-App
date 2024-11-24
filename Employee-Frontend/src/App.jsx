import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/addemp' element={<AddEmployee/>}/>
        <Route path='/admindashboard' element={<Main child={<AdminDashboard />} />} />
        <Route path='/userdashboard' element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App;

