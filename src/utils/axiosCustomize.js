import axios from "axios";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { store } from "../redux/store";
import axiosRetry from "axios-retry";
NProgress.configure({
    showSpinner: false,
    // easing: "ease",
    // speed: 500,
    // trickle: true,
    trickleSpeed: 100,
});
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // timeout: 1000,
    // headers: { "X-Custom-Header": "foobar" },
});

axiosInstance.defaults.withCredentials = true;
axiosRetry(axiosInstance, {
    retries: 3,
    retryCondition: (error) => {
        return error.response.status === 405;
    },
    retryDelay: (retryCount, error) => {
        return retryCount * 100;
    },
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        const access_token = store?.getState()?.user?.account?.access_token;
        config.headers["Authorization"] = `Bearer ${access_token}`;
        NProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response;
    },
    function (error) {
        NProgress.done();
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        //console.log(">>> error", error.response);
        const status = error.response?.status || 500;

        switch (status) {
            // authentication (token related issues)
            case 401: {
                //toast.error("Not authenticated the user");
                localStorage.removeItem("persist:root");
                window.location.href = "/dang-nhap";
                return error.response.data;
            }

            // forbidden (permission related issues)
            case 403: {
                window.location.href = "/cam";
                //toast.error(`you don't have the permission to access this resource...`);
                return Promise.reject(error);
            }

            // bad request
            case 400: {
                return Promise.reject(error);
            }

            // not found
            case 404: {
                return Promise.reject(error);
            }

            // Not Allowed
            case 405: {
                //toast.error("Please retry with a new token.");
                return error.response.data;
            }

            // conflict
            case 409: {
                return Promise.reject(error);
            }

            // unprocessable
            case 422: {
                return Promise.reject(error);
            }

            // generic api error (server related) unexpected
            default: {
                return Promise.reject(error);
            }
        }
    }
);

export default axiosInstance;
