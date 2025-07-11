import instance from "axios"

export const URI = " https://noteswift-demo-gnx1638rt-sujan-bhattas-projects.vercel.app/api" 

const api = instance.create({
    baseURL: URI,
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
})

export default api
