import axiosClient from "./axiosClientv3";

const userAPIv2 = {

    updateProfile(data) {
        const url = '/Account/UpdateProfile';
        return axiosClient.put(url, data);
    },

    get(id) {
        const url = `/Account/${id}`;
        return axiosClient.get(url);
    }

};

export default userAPIv2;