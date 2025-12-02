import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";


// ====================================================================(get user api)===================================================================

const getUser = async () => {
    const response = await axiosInstance.get('/user')
    return response?.data
}

export const useGetUser = () => {
    const query = useQuery({
        queryKey: ['getUser'],
        queryFn: getUser,
        staleTime: 15 * 60 * 1000,
    })
    return query
}