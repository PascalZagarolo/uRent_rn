import axios from 'axios';

export async function getAxiosRequest(formData, url) {
    "use server";

    try {
        await axios.get('https://www.urent-rental.de');

        console.log("axios request..");
        console.log(formData);

        const response = await axios.post("https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload", formData, {
            headers: {
                accept: 'application/json',
              'Content-Type': 'multipart/form-data'
            }
      });

        console.log("axios request..")
        console.log(response)
        return response?.data?.secure_url;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
