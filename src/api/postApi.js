import axiosClient from "./axiosClient";

const postAPI = {
    add(data) {
        const url = '/Posts';
        return axiosClient.post(url, data);
    }
};

export default postAPI;