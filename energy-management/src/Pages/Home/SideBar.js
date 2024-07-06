import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/img/bg-SideBar-Admin/bg2.jpg";
import { Link } from "react-router-dom";

import { MdDashboard } from "react-icons/md";

import "./SideBar.scss";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  const  user = useSelector((state)=>state.user)
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="lg"
        onToggle={handleToggleSidebar}
      >

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem component={<Link to="/admin" />} icon={<MdDashboard />}>
              Dashboard
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
            {user?.role==='admin'?(
              <>
                <MenuItem>
                  <Link to="/admin/managerUsers" />
                  Manager Users
                </MenuItem>
                <MenuItem>
                  <Link to="/admin/managerStaff" />
                  Manager Staffs
                </MenuItem>
                <MenuItem>
                  <Link to="/admin/managerDevices" />
                  Manager Devices
                </MenuItem>
              </>
            ): user?.role==='staff'?(
              <>
              <MenuItem>
                <Link to="/admin/managerUsers" />
                Manager Users
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerDevices" />
                Manager Devices
              </MenuItem>
              </>
            ):(<>
              <MenuItem>
                <Link to="/admin/managerDevices" />
                Manager Devices
              </MenuItem>
            </>)}
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://www.facebook.com/linhhayoverthinking"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; Nguyễn Ngọc Linh
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
