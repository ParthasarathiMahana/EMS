import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'
import { ModeToggle } from './components/mode-toggle'

function App() {

  return (
    <>
    <ModeToggle classNames="flex px-2 mt-1 flex-row-reverse"/>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
