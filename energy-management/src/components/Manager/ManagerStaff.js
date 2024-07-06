import React from "react";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";

import "./ManagerUser.scss";
import TableStaff from "../tables/TableStaff";
import { fetchAllStaff } from "../../services/staffService";
const ManagerStaff = () => {
  // const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  // const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [listStaff, setListStaff] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const token = JSON.parse(localStorage.getItem("access_token"))
  const fetchListStaff = async (page, size, searchString, token) => {
    const dataUser = await fetchAllStaff(page, size, searchString, token);
    if (dataUser) {
      console.log('dataádsdasdasd', dataUser)
      setListStaff(dataUser.result);
    }
  };

  useEffect(() => {
    fetchListStaff(page, size, searchString, token);
  }, []);
  const handleClickUpdate = (user) => {
    // setShowModalUpdateUser(true);
    // setDataUpdate(user);
  };

  return (

    <div className="manager-user-container">
      <div className="title">Manager Staff</div>
      <div className="user-contents">
        <div className="btn-add-new">
          <button
            className="btn btn-primary "
          // onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new staff
          </button>
        </div>
        {/* <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListStaff={fetchListStaff}
        /> */}
        {/* <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListStaff={fetchListStaff}
          dataUpdate={dataUpdate}
        /> */}

        <div className="btn-table-container">
          <TableStaff
            listStaff={listStaff}
            handleClickUpdate={handleClickUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerStaff;
