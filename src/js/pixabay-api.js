import axios from 'axios';
//const axios = require('axios'); // legacy way

export async function getImagesByQuery(query, page) {
  const baseURL = 'https://pixabay.com';
  const endPoint = '/api/';
  const url = baseURL + endPoint;

  const params = {
    key: '55027446-560ad86223e1945ccd495c8f6',
    q: query,
    page: page,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
