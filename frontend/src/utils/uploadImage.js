import axios from "axios"
const uploadImage = async (file) => {
    if (!file) {
        return new Error("No file selected...")
    }
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "chatapp")
    try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dytoukarv/image/upload", data)
        return res.data.url
    } catch (error) {
        return error
    }
}

export default uploadImage