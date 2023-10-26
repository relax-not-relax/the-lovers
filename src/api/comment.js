import axiosClient from "./axiosClientv2";

const commentAPI = {
    add(data) {
        const url = '/GiftComments';
        return axiosClient.post(url, data);
    }
};

export default commentAPI;