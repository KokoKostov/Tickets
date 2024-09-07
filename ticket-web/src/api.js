import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        
        console.log('1');
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
                console.log(refreshToken);
                
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                
                
                const response = await axios.post('http://localhost:5000/api/refreshToken',{}, {
                    headers:{

                        'Authorization': `Bearer ${refreshToken}`
                    }
                });

                console.log('API Refresh', response);
                const { accessToken } = response.data;

             
                localStorage.setItem('accessToken', accessToken);

                
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
