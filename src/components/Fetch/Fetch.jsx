import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "29162955-32e71cd5a6cadb845e07a1aad";


export const getFetch = async(query, page = 1, per_page = 12) => {
    const response = await axios.get("/", {
        params: {
            page,
            per_page,
            key: KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
        }
    })
    return response.data;
}

