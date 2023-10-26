import axiosClient from "./axiosClient";

const userAPI = {

    register(data) {
        //const url = '/auth/local/register';
        const url = '/Auth/Register';
        return axiosClient.post(url, data);
    },

    login(data) {
        //const url = '/auth/local';
        const url = '/Auth/LoginUser';
        return axiosClient.post(url, data);
    },

    updateProfile(data) {
        const url = '/Account/UpdateProfile';
        return axiosClient.put(url, data);
    }

};

export default userAPI;