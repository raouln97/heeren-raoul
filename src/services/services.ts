import axios from 'axios';

export const postData = async (url: string, body: any) => {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.log('Error at sending post request', error);
  }
};
