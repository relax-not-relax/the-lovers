import axiosClient from "./axiosClientv2";

const reportApi = {
    report(data) {
        const url = '/Reports';
        return axiosClient.post(url, data);
    }
}

export default reportApi;