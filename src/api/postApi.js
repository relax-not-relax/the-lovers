import axiosClient from "./axiosClientv2";

const postAPI = {
    add(data) {
        const url = '/Posts/Post';
        return axiosClient.post(url, data);
    }
};

export default postAPI;