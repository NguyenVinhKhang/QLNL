// src/App.js
import { Routes, Route } from "react-router-dom";
import { routers } from "./routers/index";
import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slice/userSlice";
import { getProfile } from "./services/userService";

function App() {
  const dispath = useDispatch()
  useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('access_token'))
        console.log('token', token)
        if(token){
          handleGetDetailUser(token)
        }
  },[])
  const handleGetDetailUser = async(token)=>{
    const res = await getProfile(token)
    dispath(updateUser(res?.data))
  }
  return (
    <div className="app-container">
      <div className="header-container">
        <Routes>
          {routers.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </div>
      <div className="sliderbar_container"></div>
      <div className="content-container"></div>
    </div>
  );
}

export default App;
