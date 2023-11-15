import axios from "axios";

const access_token = localStorage.getItem('access_token');

const axiosClientOdata = axios.create({
    baseURL: 'https://beprn231cardogloverodata20231105200328.azurewebsites.net/odata/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }
});

//Interceptors
// Add a request interceptor
axiosClientOdata.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClientOdata.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
});

export default axiosClientOdata;