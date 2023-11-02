import axiosClientOdata from "./axiosClientOdata";

const commentApiOdata = {
    get(params) {
        const url = '/GiftComments';
        return axiosClientOdata.get(url, { params });
    },
}

export default commentApiOdata;