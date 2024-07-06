import axios from "../utils/axiosCustommize";

const Login = async(phoneNumber, password) => {
  const req = await axios.post("/ems/account/login", {phoneNumber, password
  });
  return req
};
const Register = async(phoneNumber, password, name) => {
  const req = await axios.post("/ems/account/register", { phoneNumber, password, name
  });
  return req
};
const Logout = async() => {
  return await axios.get("/ems/account/logout", {
  });
};
const getProfile = async (token) => {
      const req = await axios.get(`/ems/profile/`,
          { headers: { 'Authorization': `Bearer ${token}` } });
      return req;
};
const fetchAllUser = async (pages,sizes,searchStrings,staffIds, token) => {
  const params={
    page:pages,
    size:sizes,
    searchString:searchStrings,
  }
    try {
      const response = await axios.get(`/ems/usermanagement/listcustomer`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
};
const createcustomer = async (password, phoneNumber, name,token) => {
  const req = await axios.post(`/ems/usermanagement/createcustomer`,{password, phoneNumber, name},
      { headers: { 'Authorization': `Bearer ${token}` } });
  return req;
};

export { Logout ,Register,Login,getProfile,fetchAllUser,createcustomer};