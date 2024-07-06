
import SideBar from "./SideBar";
import "./DefaulPage.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DiReact } from "react-icons/di";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  SidebarHeader,
} from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slice/userSlice";
import { Logout } from "../../services/userService";
const DefaulPage = (props) => {
  const dispath = useDispatch()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state)=>state.user)
  const handleLogout = async () => {
    await Logout();
    dispath(resetUser());
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_login")
    toast.success('Logout susscess!');
    setTimeout(()=>{
      navigate('/login'); // Navigate to the login page after logout
    },2000)
    
};
  return (
    <div>
      <Navbar expand="mg" className="" style={{background:"#211d21", color:"#fff"}} data-bs-theme="dark">
        <Container>
           <div
              style={{
                padding: "24px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <DiReact size={"3em"} color={"00bfff"} />
              <Link to="/" style={{color:'#fff',textDecoration:'none'}}>
                {user?.role==='admin'?(
                  <>Admin Manager</>
                ): user?.role==='staff'?(
                  <>Staff Manager</>
                ): user?.role==='customer'?(
                  <>Customer Manager</>
                ):(
                  <>Manager</>
                )}
              </Link>
            </div>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {user?.name!==''?
              (<>
              <NavDropdown.ItemText >{user?.name}</NavDropdown.ItemText>
              <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item></>

              ):(<>
              <NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/register">Register</NavDropdown.Item>
              </>)
              }
            </NavDropdown>
        </Container>
      </Navbar>
      <div className="defaul-container">
        <div className="defaul-sidebar">
          <SideBar collapsed={collapsed} />
        </div>
        <div className="defaul-content">
          
          <div className="defaul-main">
            <Outlet />
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};
export default DefaulPage;
