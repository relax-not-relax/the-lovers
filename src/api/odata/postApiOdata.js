import axiosClientOdata from "./axiosClientOdata";

const postApiOdata = {
    // getAll(params) {
    //     const url = '/Posts';
    //     return axiosClientOdata.get(url, { params });
    // },
    // getCount(params) {
    //     const url = '/Posts/$count';
    //     return axiosClientOdata.get(url, { params });
    // }

    async getAll(params) {
        const newParams = { ...params };
        newParams.$skip = !params._page || params._page <= 1
            ? 0
            : (params._page - 1) * (params.$top || 20);

        delete newParams._page;

        const postList = await axiosClientOdata.get('/Posts', {
            params:
                newParams
        });

        const count = await axiosClientOdata.get('/Posts/$count', {
            params:
                newParams
        });

        return {
            data: postList,
            pagination: {
                page: params._page,
                limit: params.$top,
                total: count,
            }
        }
    }
}

export default postApiOdata;