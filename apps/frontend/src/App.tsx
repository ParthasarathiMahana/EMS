import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'
import { ModeToggle } from './components/mode-toggle'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <div className='relative'>
        <ModeToggle classNames="mt-2 absolute z-[2] left-[90%] md:left-[96%]"/>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </QueryClientProvider>
    </>
  )
}

export default App
