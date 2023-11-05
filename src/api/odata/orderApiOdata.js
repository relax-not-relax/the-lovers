import axiosClientOdata from './axiosClientOdata';

const orderApiOdata = {
    get(params) {
        const url = '/Orders';
        return axiosClientOdata.get(url, { params });
    }
}
export default orderApiOdata;