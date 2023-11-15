import axiosClient from "./axiosClientv2";

const postAPI = {
    add(data) {
        const url = '/Posts/Post';
        return axiosClient.post(url, data);
    },

    remove(id) {
        const url = `/Posts/${id}`;
        return axiosClient.delete(url);
    }
};

export default postAPI;