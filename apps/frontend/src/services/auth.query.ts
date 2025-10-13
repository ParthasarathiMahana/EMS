import api from '../utils/api'
import { useQuery, useMutation } from '@tanstack/react-query'
import { type LoginInput } from '@repo/schemas'

// ==========================================================(login api)==========================================================

const login = async (payload: LoginInput) => {
    try {
        const response = await api.post('/login',{
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
    try {
        const response = api.get('/auth/me')
        return response
    } catch (error) {
        return error
    }
}

export const useShowStatus = () => {
    const query = useQuery({
        queryKey: ['showStatus'],
        queryFn: showStatus
    })

    return query
}


// ==========================================================(logout api)==========================================================

const logout = async () => {
    try {
        const response = api.get('/logout')
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