import axiosClient from "./axiosClientv2";

const orderAPI = {
    add(data) {
        const url = '/Orders/Add';
        return axiosClient.post(url, data);
    },

    get(id) {
        const url = `/GetForSeller/${id}`;
        return axiosClient.get(url);
    }
};

export default orderAPI;