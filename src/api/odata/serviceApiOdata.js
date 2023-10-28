import axiosClientOdata from "./axiosClientOdata";

const serviceApiOdata = {
    get(params) {
        const url = '/Services';
        return axiosClientOdata.get(url, { params });
    }
}

export default serviceApiOdata;