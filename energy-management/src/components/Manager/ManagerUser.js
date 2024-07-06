import React from "react";
import { useEffect, useState } from "react";
import TableUser from "../tables/TableUser";
import { FcPlus } from "react-icons/fc";

import "./ManagerUser.scss";
import { fetchAllUser } from "../../services/userService";
import ModalCreateUser from "../modals/ModalCreateUser";
const ManagerUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [listUser, setListUser] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const token = JSON.parse(localStorage.getItem("access_token"))
  const staffId = JSON.parse(localStorage.getItem("access_token"))._id

  const fetchListUser = async (page, size, searchString, staffId, token) => {
    const dataUser = await fetchAllUser(page, size, searchString, staffId, token);
    if (dataUser) {
      setListUser(dataUser?.result);

    }
  };

  useEffect(() => {
    fetchListUser(page, size, searchString, staffId, token);
  }, []);
  const handleClickUpdate = (user) => {
    // setShowModalUpdateUser(true);
    // setDataUpdate(user);
  };

  return (

    <div className="manager-user-container">
      <div className="title">Manager User</div>
      <div className="user-contents">
        <div className="btn-add-new">
          <button
            className="btn btn-primary "
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new user
          </button>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
        {/* <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUser}
          dataUpdate={dataUpdate}
        /> */}

        <div className="btn-table-container">
          <TableUser
            listUser={listUser}
            handleClickUpdate={handleClickUpdate}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerUser;
