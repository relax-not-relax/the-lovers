import axiosClientOdata from "./axiosClientOdata";

const itemApiOdata = {
    get(params) {
        const url = '/Items';
        return axiosClientOdata.get(url, { params });
    }
}

export default itemApiOdata;