import axios from "axios"


const refreshToken = async (refreshToken) => {
    const response = await axios.get(`https://beprn231catdoglover20231017210252.azurewebsites.net/api/Auth/RefreshToken/${refreshToken}`);
    return response;
}

export default refreshToken;