import { API_PATHS } from "./apiPaths"
import axiosInstance from "./axiosIntance"


const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile)
    try {
        const response = axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return (await response).data;

    } catch (error) {
        console.error("Error uploading the Image:", error)
        throw error;
    }
}

export default uploadImage