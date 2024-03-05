import axios from "axios"

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: "http://127.0.0.1:8080/api/",
        withCredentials: true
    })
    return instance
}
const newRequest = axiosInstance()
export default newRequest