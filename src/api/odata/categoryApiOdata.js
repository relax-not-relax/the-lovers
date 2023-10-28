import axiosClientOdata from "./axiosClientOdata";

const categoryApiOdata = {
    getAll(params) {
        const url = '/Categories';
        return axiosClientOdata.get(url, { params });
    }
}

export default categoryApiOdata;