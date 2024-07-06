import axios from '../utils/axiosCustommize';

const createDevice = async (serial, deviceName, deviceAddress, token) => {
    try {
        if (!token) {
            throw new Error('Token is missing or expired');
        }

        const response = await axios.post(
            `/ems/devicemanagement/createdevice`,
            { serial, deviceName, deviceAddress },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

        return response;
    } catch (error) {
        console.error('Error creating device:', error);
        throw error;
    }
};

const DeviceDetailApi = async (serial) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token is missing or expired');
        }

        const response = await axios.get(
            `/ems/devicemanagement/devicedetail/${serial}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

        return response;
    } catch (error) {
        console.error('Error getting device detail:', error);
        throw error;
    }
};

const editDeviceDetail = async (serial, deviceName, deviceAddress) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token is missing or expired');
        }

        const response = await axios.put(
            `/ems/devicemanagement/editdevicedetail/${serial}`,
            { serial, deviceName, deviceAddress },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

        return response;
    } catch (error) {
        console.error('Error editing device detail:', error);
        throw error;
    }
};

const deviceChangePath = async (serial, paths) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token is missing or expired');
        }

        const response = await axios.put(
            `/ems/devicemanagement/editdevicepath/${serial}`,
            paths,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating device paths:', error);
        return null;
    }
};
const getFollowingDevices = async ({ page, size, searchString, profileId }) => {
    try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (!token) {
            throw new Error('Token is missing or expired');
        }

        const response = await axios.get(`/ems/devicemanagement/followingdevices`, {
            params: { page, size, searchString, profileId },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response;
    } catch (error) {
        console.error('Error fetching following devices:', error);
        throw error;
    }
};
const getOwnDevices = async (page, size, searchString) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token is missing or expired');
        }

        const response = await axios.get(`/ems/devicemanagement/owndevices`, {
            params: { page, size, searchString },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response;
    }
    catch (error) {
        console.error('Error fetching own devices:', error);
        throw error;
    }
};
const fetchAllDevices = async (pages, sizes, searchStrings, token) => {
    const params={
        page:pages,
        size:sizes,
        searchString:searchStrings
      }
        try {
          const response = await axios.get(`/ems/devicemanagement/listalldevice`, {
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



export {
    createDevice,
    DeviceDetailApi,
    editDeviceDetail,
    deviceChangePath,
    getFollowingDevices,
    getOwnDevices,
    fetchAllDevices
};
