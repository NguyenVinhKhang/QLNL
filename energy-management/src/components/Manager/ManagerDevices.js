// import React from "react"; 
// import { useEffect, useState } from "react";
// import TableUser from "../tables/TableUser";
// import { FcPlus } from "react-icons/fc";

// import "./ManagerUser.scss";
// import ModalCreateDevices from "../modals/ModalCreateDevices";
// import TableDevices from "../tables/TableDevices";
// import { fetchAllDevices } from "../../services/devicesService";
// const ManagerDevices = () => {
//   const [showModalCreateDevices, setShowModalCreateDevices] = useState(false);
//   const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
//   const [dataUpdate, setDataUpdate] = useState({});
//   const [listDevices, setListDelistDevices] = useState([]);
//   const [searchString, setSearchString] = useState("");
//   const [page, setPage] = useState(3);
//   const [size, setSize] = useState(2);
//   const token = JSON.parse(localStorage.getItem("access_token"))
//   const fetchListDelistDevices = async (page,size, searchString, token) => {
//     const dataUser = await fetchAllDevices(page,size, searchString, token);
//     if (dataUser ) {
//       setListDelistDevices(dataUser.result);

//     }
//   };

//   useEffect(() => {
//     fetchListDelistDevices(page ,size, searchString, token);
//   }, []);
//   const handleClickUpdate = (user) => {
//     // setShowModalUpdateUser(true);
//     // setDataUpdate(user);
//   };

//   return (

//     <div className="manager-user-container">
//       <div className="title">Manager Devices</div>
//       <div className="user-contents">
//         <div className="btn-add-new">
//           <button
//             className="btn btn-primary "
//             onClick={() => setShowModalCreateDevices(true)}
//           >
//             <FcPlus />
//             Add new devices
//           </button>
//         </div>
//         <ModalCreateDevices
//           show={showModalCreateDevices}
//           setShow={setShowModalCreateDevices}
//           fetchListDevices={fetchListDelistDevices}
//         />
//         {/* <ModalUpdateUser
//           show={showModalUpdateUser}
//           setShow={setShowModalUpdateUser}
//           fetchListDevices={fetchListDevices}
//           dataUpdate={dataUpdate}
//         /> */}

//         <div className="btn-table-container">
//           <TableDevices
//             listDevices={listDevices}
//             handleClickUpdate={handleClickUpdate}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDevices;
import React, { useEffect, useState } from "react";
import TableDevices from "../tables/TableDevices";
import { FcPlus } from "react-icons/fc";
import "./ManagerDevices.scss";
import ModalCreateDevices from "../modals/ModalCreateDevices";
import ReactPaginate from "react-paginate";
import { fetchAllDevices } from "../../services/devicesService";

const ManagerDevices = () => {
  const [showModalCreateDevices, setShowModalCreateDevices] = useState(false);
  const [listDevices, setListDevices] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(0);
  const token = JSON.parse(localStorage.getItem("access_token"));

  // Fetch list of devices based on pagination parameters
  const fetchListDevices = async (page, size, searchString, token) => {
    try {
      const response = await fetchAllDevices(page, size, searchString, token);
      if (response && response.result) {
        setListDevices(response.result);
        // const totalItems = response.resultSize;
        // const totalPagesCount = Math.ceil(totalItems / size);
        setTotalPages(5);
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  // Load initial device list on component mount
  useEffect(() => {
    fetchListDevices(page, size, searchString, token);
  }, [page, size, searchString, token]);

  // Handle page change for pagination
  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1); // react-paginate uses 0-based index
  };

  // Handle update device action
  const handleClickUpdate = (device) => {
    // Implement update device functionality
    console.log("Update device:", device);
  };

  // Handle delete device action
  // const handleClickDelete = async (device) => {
  //   try {
  //     const response = await deleteDevice(device._id, token);
  //     if (response && response.data && response.data.success) {
  //       // Update list of devices after deletion
  //       fetchListDevices(page, size, searchString, token);
  //       console.log("Device deleted successfully.");
  //     } else {
  //       console.error("Failed to delete device.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting device:", error);
  //   }
  // };

  return (
    <div className="manager-devices-container">
      <div className="title">Manager Devices</div>
      <div className="devices-contents">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateDevices(true)}
          >
            <FcPlus />
            Add new device
          </button>
        </div>
        <ModalCreateDevices
          show={showModalCreateDevices}
          setShow={setShowModalCreateDevices}
          fetchListDevices={fetchListDevices}
        />

        <div className="btn-table-container">
          <TableDevices
            listDevices={listDevices}
            handleClickUpdate={handleClickUpdate}
          // handleClickDelete={handleClickDelete}
          />
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerDevices;
