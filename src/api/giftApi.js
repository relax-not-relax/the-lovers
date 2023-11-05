import axiosClient from "./axiosClientv2";

const giftAPI = {
    getGiftsGiven(accountId) {
        const url = `GiftsGiven/${accountId}`;
        return axiosClient.get(url);
    }
}

export default giftAPI;