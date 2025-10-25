import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'
import Profile from './pages/Profile.js'
import { ModeToggle } from './components/mode-toggle'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { AppLayout } from './AppLayout.tsx'


function App() {

  const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <div className='relative'>
        <ModeToggle classNames="mt-2 absolute z-[2] left-[90%] md:left-[96%]"/>
        <div>
          <Toaster richColors position="top-right" /> 
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                <Route path='/profile' element={<Profile/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right"/>
    </QueryClientProvider>
    </>
  )
}

export default App
