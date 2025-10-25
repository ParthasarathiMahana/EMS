import axiosInstance from '../utils/axiosInstance'
import { useQuery, useMutation } from '@tanstack/react-query'
import { type LoginInput } from '@repo/schemas'

// ==========================================================(login api)==========================================================

const login = async (payload: LoginInput) => {
    try {
        const response = await axiosInstance.post('/login',{
            email: payload.email,
            password: payload.password
        })

        // console.log('succssfully logged in', response);    
        return response
    } catch (error: any) {
        // console.log(error);
        return error?.response
    }

}

export const useLogin = () => {
    const mutate = useMutation(
        {
            mutationFn: login,
            mutationKey: ['userlogin']
        }
    )
    return mutate
}

// ==========================================================(me api)==========================================================

const showStatus = async () => {
        const response = await axiosInstance.get('/auth/me')
        return response?.data
}

export const useShowStatus = () => {
    const query = useQuery({
        queryKey: ['showStatus'],
        queryFn: showStatus,
        staleTime: 15 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        retry: false
    })

    return query
}

// ==========================================================(refresh api)==========================================================

const refreshAuth = async() => {
    const response = await axiosInstance.get('/auth/refresh')
    return response?.data
}

export const useRefreshAuth = () => {
    const query = useQuery({
        queryKey:['refreshAuth'],
        queryFn: refreshAuth,
        retry: false
    })
    return query
}

// ==========================================================(logout api)==========================================================

const logout = async () => {
    try {
        const response = await axiosInstance.get('/logout')
        return response
    } catch (error) {
        return error
    }
}

export const useLogout = () => {
    const query = useQuery({
        queryKey: ['logout'],
        queryFn: logout
    })

    return query
}