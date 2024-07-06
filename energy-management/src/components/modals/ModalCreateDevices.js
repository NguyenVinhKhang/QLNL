import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./Modal.scss";
import { createDevice } from "../../services/devicesService";
import { useNavigate } from "react-router-dom";

const ModalCreatenameDevices = (props) => {
  const { show, setShow, fetchListUser } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setNamedevices("");
    setSerial("");
    setAddress("");
  };

  const [namedevices, setNamedevices] = useState("");
  const [serial, setSerial] = useState("");
  const [address, setAddress] = useState("");

  const token = JSON.parse(localStorage.getItem("access_token"));

  const handleSubmitCreateUsers = async () => {
    if (!namedevices) {
      toast.error("Invalid device name");
      return;
    }
    if (!serial) {
      toast.error("Invalid serial");
      return;
    }
    if (!address) {
      toast.error("Invalid address");
      return;
    }

    try {
      await createDevice(serial, namedevices, address, token);
      toast.success("Device created successfully");
      setTimeout(() => {
        navigate('/admin/managerDevices');
      }, 1000);
    } catch (error) {
      toast.error("Failed to create device");
    }
    setNamedevices(namedevices);
    setAddress(address);
    setSerial(serial);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      size="md"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-12">
            <label className="form-label">Device Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter device name"
              value={namedevices}
              onChange={(e) => setNamedevices(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Serial Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter serial number"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitCreateUsers}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreatenameDevices;
