import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://beprn231catdoglover20231017210252.azurewebsites.net/api/',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

const fileApi = {
    upload(data) {
        const url = '/FireBase/UploadImageFile';
        return axiosClient.post(url, data);
    },
}

export default fileApi;