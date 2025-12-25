// import axios from "axios";


// export const imageUpload = async ImageData =>{
//     const formData = new FormData();
//     formData.append('image', ImageData);
  
//     const response = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
//         formData
//       );
//       return response.data.data.display_url

// }

// utils.js\
import axios from "axios";

export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append('file', image); // Cloudinary uses 'file'
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        
        // Cloudinary returns the URL in 'secure_url'
        return data.secure_url; 
    } catch (error) {
        console.error("Cloudinary Error:", error.response?.data?.error?.message || error.message);
        throw new Error(error.response?.data?.error?.message || "Image upload failed");
    }
};