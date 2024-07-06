import axios from '../utils/axiosCustommize';

const fetchAllStaff = async (pages,sizes,searchStrings, token) => {
  const params={
    page:pages,
    size:sizes,
    searchString:searchStrings
  }
    try {
      const response = await axios.get(`/ems/usermanagement/liststaff`, {
        params ,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  export{fetchAllStaff};