import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import postApiOdata from "../../../api/odata/postApiOdata";
import StorageKeys from "../../../constants/storage-keys";

export default function useUserDetail(accountId) {
    const [listPost, setListPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await postApiOdata.get({
                    $filter: `OwnerId eq ${accountId}`,
                    $expand: `Gifts,Products,Services`,
                    $orderBy: "createDate desc",
                });
                setListPost(response.value);
            } catch (error) {
                console.log('Failed to load posts', error);
                if (error.code === 'ERR_NETWORK') {
                    const refreshToken = localStorage.getItem(StorageKeys.REFRESH);
                    const response = await axios.get(`https://beprn231catdoglover20231017210252.azurewebsites.net/api/Auth/RefreshToken/${refreshToken}`);
                    if (response.status === 200) {
                        localStorage.setItem(StorageKeys.TOKEN, response.data.accessToken);
                        window.location.reload();
                    }

                }
            }

            setLoading(false);
        })()
    }, [accountId]);

    return { listPost, loading }
}