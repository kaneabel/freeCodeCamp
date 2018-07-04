import axios from 'axios';

export default {
  async get(url) {
    const response = await axios.get(url);

    if (!response || response.error) {
      return false;
    }

    return response.data;
  },
};

