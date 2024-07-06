import ReactPaginate from "react-paginate";
const TableUser = (props) => {
  const { listUser, handleClickUpdate, setPage } = props;
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };
  console.log('listUser', listUser)
  return (
    <div className="table-user-container px-4 mt-4">
      <table class="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Tên người dùng  </th>
            <th scope="col">Chức vụ  </th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.length === 0 ? (
            <tr>
              <td colSpan="5">No data</td>
            </tr>
          ) : (
            listUser.map((user, index) => (

              <tr key={index}>

                <td>{user?._id}</td>
                <td>{user?.name}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.role}</td>
                <td>
                  <button className="btn btn-secondary">View</button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickUpdate(user)}
                  >
                    Upadte
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default TableUser;
