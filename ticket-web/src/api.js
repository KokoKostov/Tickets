import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
      
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
              
                
                const refreshToken = localStorage.getItem('refreshToken')
                
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                
                
                const response = await axios.post('/refreshToken',{}, {
                    headers:{

                        'Authorization': `Bearer ${refreshToken}`
                    }
                });


                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                api.defaults.headers.common['Authorization']= `Bearer ${accessToken}`
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                
                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
               
            }
        }

        return Promise.reject(error);
    }
);

export default api;
