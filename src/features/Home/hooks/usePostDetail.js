import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import postApiOdata from "../../../api/odata/postApiOdata";
import StorageKeys from "../../../constants/storage-keys";

export default function usePostDetail(postId) {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await postApiOdata.get({
                    $filter: `PostId eq ${postId}`,
                    $expand: `Gifts,Products,Services`,
                });
                setPost(response.value[0]);
                //console.log(response.value[0])
            } catch (error) {
                console.log('Failed to load post', error);
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
    }, [postId]);

    return { post, loading };
}
