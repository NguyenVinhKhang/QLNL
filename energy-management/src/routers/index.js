import SignInPage from "../Pages/SignInPage/SignInPage"
import SignUpPage from "../Pages/SignUpPage/SignUpPage"
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import DefaulPage from "../Pages/Home/DefaulPage"
import ManagerUser from "../components/Manager/ManagerUser";

import ManagerDevices from "../components/Manager/ManagerDevices";
import ManagerStaff from "../components/Manager/ManagerStaff";
import Profile from "../Pages/Profile/Profile";
// import router Admin


export const routers = [
  {
    path: "/",
    element: <DefaulPage />,
    children: [
      { path: "/admin/managerUsers", element: <ManagerUser /> },
      { path: "/admin/managerStaff", element: <ManagerStaff /> },
      { path: "/admin/managerDevices", element: <ManagerDevices /> },
      
      { path: "/profile", element: <Profile /> },
    ]
  },
  { path: "/login", element: <SignInPage /> },
  { path: "/register", element: <SignUpPage /> },
  { path: "*", element: <NotFoundPage /> },
];
