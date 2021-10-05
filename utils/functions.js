import axios from "axios";

const baseUrl = process.env.BASE_URL;

export const getDataApi = async (url) => {
    return await axios.get(`${baseUrl}/api/${url}`)
};

export const postDataApi = async (url, body, token) => {
    return await axios.post(`${baseUrl}/api/${url}`, body, {
        headers: {
            Authorization: token
        }
    })
};


export const putDataApi = async (url, body, token) => {
    return await axios.put(`${baseUrl}/api/${url}`, body, {
        headers: {
            Authorization: token
        }
    })
};

export const patchDataApi = async (url, body, token) => {
    return await axios.patch(`${baseUrl}/api/${url}`, body, {
        headers: {
            Authorization: token
        }
    })
};

export const deleteDataApi = async (url, id, token) => {
    return await axios.delete(`${baseUrl}/api/${url}`, {id}, {
        headers: {
            Authorization: token
        }
    })
};