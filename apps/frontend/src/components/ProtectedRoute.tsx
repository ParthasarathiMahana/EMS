import React, { useEffect } from 'react'
import { useShowStatus } from '../services/auth.query'
import { useNavigate } from 'react-router-dom'

type childrenType = {
    children : React.ReactNode
}

const ProtectedRoute = ({children}: childrenType) => {
    const navigate = useNavigate()
    const {data, isError, isLoading} = useShowStatus()

    useEffect(()=>{
        if(!isLoading){
        // console.log(data,isError);
            if(isError || !data){
                navigate('/login')
            }
        }
    }, [isError, data, isLoading, navigate])

    // if(data?.status === 401){
    //     navigate('/login')
    // }

  return (
    <>{children}</>
  )
}

export default ProtectedRoute
