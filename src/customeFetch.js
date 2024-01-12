import axios from "axios"

export const customFetch = axios.create({
    // baseURL: "http://10.7.152.75:3000/"
    baseURL: "http://localhost:3000/"
})