import instance from "axios"

export const URI = "http://192.168.1.87:5000/api" 

const api = instance.create({
    baseURL: URI,
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
})

export default api
