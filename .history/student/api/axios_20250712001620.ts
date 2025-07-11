import axios from "axios"

export const URI = "https://noteswift-demo-gnx1638rt-sujan-bhattas-projects.vercel.app/api"

const api = axios.create({
    baseURL: URI,
    withCredentials: true
})

export default api
