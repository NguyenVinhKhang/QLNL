import React from "react";

const TableDevices = (props) => {
  const { listDevices, handleClickUpdate, handleClickDelete } = props;

  return (
    <div className="table-devices-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Device Name</th>
            <th scope="col">Serial</th>
            <th scope="col">Device Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listDevices.length === 0 ? (
            <tr>
              <td colSpan="5">No data</td>
            </tr>
          ) : (
            listDevices.map((device, index) => (
              <tr key={device._id}>
                <td>{index + 1}</td>
                <td>{device.deviceName}</td>
                <td>{device.serial}</td>
                <td>{device.deviceAddress}</td>
                <td>
                  <button className="btn btn-secondary">View</button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickUpdate(device)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickDelete(device)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableDevices;
