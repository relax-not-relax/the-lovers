import axiosClientOdata from "./axiosClientOdata";

const serviceSchedulerApiOdata = {
    get(params) {
        const url = '/ServiceSchedulers';
        return axiosClientOdata.get(url, { params });
    }
}

export default serviceSchedulerApiOdata;