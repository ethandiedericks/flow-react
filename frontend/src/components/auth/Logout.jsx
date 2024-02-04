import axiosInstance from '../../axios';

const logout = async () => {
  try {
    await axiosInstance.post('token/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    console.log('Successfully logged out');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default logout;
