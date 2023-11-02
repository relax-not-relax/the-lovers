import axiosClient from "./axiosClientv2";

const commentAPI = {
    add(data) {
        const url = '/GiftComments';
        return axiosClient.post(url, data);
    },

    accept(data) {
        const url = `/GiftComments/Accept/${data.GiftCommentId}`;
        return axiosClient.put(url, data);
    }

};

export default commentAPI;