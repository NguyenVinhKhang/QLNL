import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";
import { createcustomer } from "../../services/userService";

const ModalCreateUser = (props) => {
  const { show, setShow, fetchListUser } = props;
  const handleClose = () => {
    setShow(false);
    setPassword("");
    setUserName("");
    setPhone("");
  };
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const token = JSON.parse(localStorage.getItem("access_token"))
  const navige = useNavigate()
  const handleSubmitCreateUsers = async (password, phone,username, token) => {
    if (!password) {
      toast.error("Invalid Password");
    }
    if (!username) {
      toast.error("Invalid username");
    }
    if (!phone) {
      toast.error("Invalid phone");
    }
    if(password && username && phone){
      await createcustomer(password, phone,username, token)
      toast.success("Tạo người dùng thành công")
      setTimeout(()=>{
        handleClose()
      })
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="md"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Craete New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
          <div className="col-12">
              <label className="form-label">Tên người dùng</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên người dùng"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                 placeholder="Nhập số điện thoại"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="cod-12">
              <label className="form-label">Password</label>
              <input
                type="password" 
                className="form-control"
                 placeholder="Nhập password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>  
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUsers(password, phone,username, token)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
