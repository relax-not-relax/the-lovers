//import axiosClient from "../axiosClientv2";
import axiosClientOdata from "./axiosClientOdata";

const postApiOdata = {
    get(params) {
        const url = '/Posts';
        return axiosClientOdata.get(url, { params });
    },

    getCount(params) {
        const url = '/Posts/$count';
        return axiosClientOdata.get(url, { params });
    },

    async getAll(params) {
        //const user = JSON.parse(localStorage.getItem('userTheLovers'));
        try {
            const newParams = { ...params };
            newParams.$skip = !params._page || params._page <= 1
                ? 0
                : (params._page - 1) * (params.$top || 20);

            delete newParams._page;

            const postList = await axiosClientOdata.get(`/Posts`, {
                params:
                    newParams
            });

            const count = await axiosClientOdata.get(`/Posts/$count`, {
                params:
                    newParams
            });

            return {
                data: postList.value,
                pagination: {
                    page: params._page,
                    limit: params.$top,
                    total: count,
                }
            }
        } catch (error) {
            if (error.response) {
                return {
                    status: error.response.status,
                    data: [],
                    pagination: {
                        page: 1,
                        limit: params.$top,
                        total: 0,
                    },
                };
            }
            throw error;
        }

    }
}

export default postApiOdata;