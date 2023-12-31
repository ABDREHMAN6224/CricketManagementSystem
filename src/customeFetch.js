import axios from "axios"

export const customFetch = axios.create({
    baseURL: "http://192.168.18.27:3000/"
    // baseURL: "http://localhost:3000/"
})