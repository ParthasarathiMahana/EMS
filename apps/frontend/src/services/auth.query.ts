import api from '../utils/api'
import { useQuery, useMutation } from '@tanstack/react-query'
import { type LoginInput } from '@repo/schemas'

const login = async (payload: LoginInput) => {
    try {
        const response = await api.post('/login',{
            email: payload.email,
            password: payload.password
        })

        console.log('succssfully logged in', response);    
        return response
    } catch (error) {
        console.log(error);
    }

    return "Incorrect credentials"
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

