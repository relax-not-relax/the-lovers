import axiosClient from "./axiosClientv2";

const orderAPI = {
    add(data) {
        const url = '/Orders/Add';
        return axiosClient.post(url, data);
    }
};

export default orderAPI;