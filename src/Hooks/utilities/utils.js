import axios from "axios";


export const imageUpload = async ImageData =>{
    const formData = new FormData();
    formData.append('image', ImageData);
  
    const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      return response.data.data.display_url

}


// import axios from "axios";
// export const imageUpload = async (imageFile) => {
//   if (!imageFile) throw new Error("No image selected");

//   const base64 = await fileToBase64(imageFile);

//   const formData = new FormData();
//   formData.append("image", base64.split(",")[1]); // ONLY base64 string

//   const res = await fetch(
//     `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();

//   if (!data.success) {
//     throw new Error("ImgBB upload failed");
//   }

//   return data.data.display_url;
// };

// const fileToBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });