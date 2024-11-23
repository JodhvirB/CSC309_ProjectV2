import axios from 'axios';

export const fetchUserProfile = async () => {
  const response = await axios.get('/api/users/profile');
  return response.data;
};

export const updateUserProfile = async (data: Partial<any>) => {
  const response = await axios.put('/api/users/profile', data);
  return response.data;
};
