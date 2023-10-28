import axiosClientOdata from "./axiosClientOdata";
import axiosClient from "../axiosClientv2";

const reactApiOdata = {
    get(params) {
        const url = '/Reacts';
        return axiosClientOdata.get(url, { params });
    },

    count(params) {
        const url = '/Reacts/$count';
        return axiosClientOdata.get(url, { params });
    },

    post(data) {
        const url = '/Reacts';
        return axiosClient.post(url, data);
    }
}

export default reactApiOdata;