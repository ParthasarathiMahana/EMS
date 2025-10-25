import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"http://localhost:3001",
    withCredentials: true
})

const axiosBase = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true
  })

let isRefreshing = false
let pendingApiQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {    
    pendingApiQueue.forEach(prom => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })
    pendingApiQueue = []
  }
  

axiosInstance.interceptors.response.use(
    (success)=>success,
    async(error)=>{
        const originalRequest = error.config;

        if(error.response.status === 401 && !originalRequest._retry){
            // call the refresh api to validate refresh token and send a new access token on success
            if(!isRefreshing){
                isRefreshing = true
                originalRequest._retry = true
                try {
                    // console.log("calling refresh api from interceptor......");
                    const apiResponse = await axiosBase.get('/auth/refresh') 
                    processQueue(null, apiResponse.data.accessToken)
                    // call the original request
                    // console.log("redirecting to original request from interceptor.......");
                    return axiosInstance(originalRequest)
                } catch (error) {
                    // console.log("Error while validating refresh token!", error);
                    processQueue(error, null)
                    return Promise.reject(error)
                }finally{
                    isRefreshing = false
                }
            }else{
                return new Promise((resolve, reject) => {
                    pendingApiQueue.push({resolve, reject})
                }).then(() => {
                    // originalRequest.headers['Authorization'] = 'Bearer ' + token // needed for mobile and external apis
                    return axiosInstance(originalRequest)
                  })
                  .catch((err) => Promise.reject(err))
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance