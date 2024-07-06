import "./SignInPage.scss";
import { Row, Col } from "react-bootstrap";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import background from "../../assets/img/signin/background.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProfile, Login } from "../../services/userService";
import { updateUser } from "../../redux/slice/userSlice";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispath = useDispatch()
  const [defaultvalid, setDefauValid] = useState({
    isValidPhoneNumber: true,
    isValidPassword: true,
  });
  const [objCheckValid, setObjCheckValid] = useState(defaultvalid);
  const handleClick = (e) => {
    e.preventDefault();
  };

  const checkInputLogin = () => {

    if (!phoneNumber) {
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidPhoneNumber: false,
      }));
      toast.error("Chưa nhập PhoneNumber");
    } else if (!password) {
      toast.error("Chưa nhập password ");
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidPassword: false,
      }));
    }else {
      return true;
    }
  };
  const handleLogin = async () => {
    if (checkInputLogin()) {
      let userLogin = await Login(phoneNumber, password);
      if (userLogin) {
        toast(userLogin.message);
        console.log('userLogin?.data', userLogin?.data)
        localStorage.setItem('access_token', JSON.stringify(userLogin?.data?.token))
        localStorage.setItem('user_login', JSON.stringify(userLogin?.data?.account))
        console.log('userLogin?.data?.token', userLogin?.data?.token)
        setTimeout(async() => {
          const profile = await getProfile(userLogin?.data?.token)
          dispath(updateUser(profile?.data))
          console.log('profile', profile)
        }, 2000);
        
        // dispath(updateUser())
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast(userLogin.message);
        setTimeout(() => {
          navigate("/login"); 
        }, 2000);
      }
    }
  };
  // const handleGetDetailUser = async(id,token)=>{
  //   const res = await getDetailUser(id,token)
  //   dispath(updateUser(res?.data))
  // }
  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="signin-container">
      <div className="content-signin">
        <Row>
          <Col lg={7}>
            <div className="sign-control">
              <div className="title-signin">Đăng nhập bằng số điện thoại</div>
              <span className="description-signin">
                Nhập emai và mật khẩu tài khoản BookStore
              </span>
              <form onClick={(e) => handleClick(e)}>
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputPhoneNumber1">PhoneNumber</label>
                  <input
                    type="number"
                    className={
                      objCheckValid.isValidPhoneNumber
                        ? "form-control mt-2"
                        : "form-control mt-2 is-invalid"
                    }
                    id="exampleInputPhoneNumber1"
                    aria-describedby="PhoneNumberHelp"
                    placeholder="Enter PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2 custom-input">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    className={
                      objCheckValid.isValidPassword
                        ? "form-control mt-2"
                        : "form-control mt-2 is-invalid"
                    }
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="eye"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary col-12 mt-4"
                  onClick={handleLogin}
                >
                  Submit
                </button>
              </form>
              <div className="info-account">
                <div className="forget-password">Quên mật khẩu?</div>
                <div>
                  Chưa có tài khoản
                  <span
                    className="create-account"
                    onClick={handleCreateAccount}
                  >
                    Tạo tài khoản
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="sidebar-signin">
              <div className="img-signin">
                <img src={background} alt="background" />
              </div>
              <div className="title-introduce">Mua sắm tại Tiki</div>
              <span className="desc-month">Siêu ưu đãi mỗi ngày</span>
            </div>
          </Col>
        </Row>
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
  );
};

export default SignInPage;
