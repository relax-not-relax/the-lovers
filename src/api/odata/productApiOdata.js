import axiosClientOdata from "./axiosClientOdata";

const productApiOdata = {
    get(params) {
        const url = '/Products';
        return axiosClientOdata.get(url, { params });
    }
}

export default productApiOdata;