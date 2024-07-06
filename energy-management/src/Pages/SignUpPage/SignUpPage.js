import { Row, Col } from "react-bootstrap";
import background from "../../assets/img/signin/background.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.scss";
import { Register } from "../../services/userService";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [defaultvalid, setDefauValid] = useState({
    isValidEmail: true,
    isValidConfirmPassword: true,
  });
  const [objCheckValid, setObjCheckValid] = useState(defaultvalid);
  const [userName, setUserName] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [confỉrmPassword, setConfirmPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
  };

  const checkInputRegister = () => {
    setObjCheckValid(defaultvalid);
    if (
      !userName ||
      !phone ||
      !password ||
      !confỉrmPassword
    ) {
      toast.error("Chưa nhập đầy đủ thông tin");
      return false;
    } else if (confỉrmPassword !== password) {
      toast.error("Xác nhận mật khẩu cà mật khẩu không giống nhau");
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidConfirmPassword: false,
      }));
      return false;
    } else {
      return true;
    }
  };

  const handRegister = async () => {
    if (checkInputRegister()) {
      let dataUser = await Register(
        phone,
        password,
        userName,
      );
      console.log("check dataUser: ", dataUser);
      toast.success(dataUser.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleLoginAccout = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="content-signup">
        <Row>
          <Col lg={7}>
            <div className="sign-control">
              <div className="title-signup">Xin Chào</div>
              <span className="description-signup">
                Đăng ký tài khoản BookStore
              </span>
              <form onClick={handleClick}>
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">Tên người dùng</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Nhập tên người dùng"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2 custom-input">
                  <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    className="form-control mt-2"
                    id="exampleInputPassword1"
                    placeholder="Nhập mật khẩu"
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

                <div className="form-group mt-2 custom-input">
                  <label htmlFor="exampleInputPassword1">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type={isShowConfirmPassword ? "text" : "password"}
                    className={
                      objCheckValid.isValidConfirmPassword
                        ? "form-control mt-2"
                        : "form-control mt-2 is-invalid"
                    }
                    id="exampleInputPassword1"
                    placeholder="Xác nhận mật khẩu"
                    value={confỉrmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div
                    className="eye"
                    onClick={() =>
                      setIsShowConfirmPassword(!isShowConfirmPassword)
                    }
                  >
                    {isShowConfirmPassword ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary col-12 mt-4"
                  onClick={handRegister}
                >
                  Đăng ký
                </button>
              </form>
              <div className="info-account">
                <div>
                  Trở về
                  <span className="create-account" onClick={handleLoginAccout}>
                    Đăng nhập
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="sidebar-signup">
              <div className="img-signup">
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

export default SignUpPage;
