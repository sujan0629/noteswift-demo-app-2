import instance from "axios"

export const URI = "https://jsonplaceholder.typicode.com";


const api = instance.create({
    baseURL: URI,
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
})

export default api
