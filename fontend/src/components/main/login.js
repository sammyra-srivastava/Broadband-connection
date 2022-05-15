import { Formik } from "formik";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app_config from "../../config";
import "./login.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Login = () => {
  const url = app_config.api_url;

  const [loggedin, setLoggedin] = useState(false);
  const navigate = useNavigate();

  const loginForm = {
    email: "",
    password: "",
  };

  const loginSubmit = (values) => {
    console.log(values);

    const reqOpt = {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url + "/user/backendlogin", reqOpt).then((res) => {
      if (res.status == 200) {
        console.log("login success");
        res.json().then((data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          setLoggedin(true);
          navigate("/user/addreview");
        });
        // toast.success("Loggedin Successfully");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "login success",
        });
      } else if (res.status == 300) {
        console.log("login failed");
        // toast.error("Loggin Failed");
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "login failed",
        });
      }
    });
  };

  return (
    <section class="background-radial-gradient overflow-hidden signup">
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start">
        <div class="row gx-lg-5 align-items-center mb-5 h-100">
          <div class="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1
              class="my-5 display-3 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              <span>Connecty</span> <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Choose the Best Broadband
              </span>
            </h1>
            <p class="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Temporibus, expedita iusto veniam atque, magni tempora mollitia
              dolorum consequatur nulla, neque debitis eos reprehenderit quasi
              ab ipsum nisi dolorem modi. Quos?
            </p>
          </div>
          <div
            class="col-lg-5 mb-5 mb-lg-0 position-relative"
            style={{ height: "70vh" }}
          >
            <div
              id="radius-shape-1"
              class="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              class="position-absolute shadow-5-strong"
            ></div>
            <div class="card bg-glass h-100 my-5">
              <div class="card-body px-4 py-5 px-md-5">
                <h2 className="text-center my-5">Sign In Here</h2>
                <Formik initialValues={loginForm} onSubmit={loginSubmit}>
                  {({ values, handleSubmit, handleChange }) => (
                    <form onSubmit={handleSubmit}>
                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          class="form-control active"
                          autocompleted=""
                        />
                        <label
                          class="form-label"
                          for="form3Example3"
                          style={{ marginLeft: "0px" }}
                        >
                          Email address
                        </label>
                        <div class="form-notch">
                          <div
                            class="form-notch-leading"
                            style={{ width: "9px" }}
                          ></div>
                          <div
                            class="form-notch-middle"
                            style={{ width: "88.8px" }}
                          ></div>
                          <div class="form-notch-trailing"></div>
                        </div>
                      </div>
                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          class="form-control active"
                          autocompleted=""
                        />
                        <label
                          class="form-label"
                          for="form3Example3"
                          style={{ marginLeft: "0px" }}
                        >
                          Password
                        </label>
                        <div class="form-notch">
                          <div
                            class="form-notch-leading"
                            style={{ width: "9px" }}
                          ></div>
                          <div
                            class="form-notch-middle"
                            style={{ width: "88.8px" }}
                          ></div>
                          <div class="form-notch-trailing"></div>
                        </div>
                      </div>
                      <FormGroup sx={{ mt: 1 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </FormGroup>
                      <button
                        type="submit"
                        class="btn btn-primary btn-block mb-4 mt-5"
                        aria-controls="#picker-editor"
                      >
                        Sign in
                      </button>
                      <div class="text-center">
                        <p>or sign in with:</p>
                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i
                            class="fab fa-facebook-f"
                            aria-controls="#picker-editor"
                          ></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i
                            class="fab fa-google"
                            aria-controls="#picker-editor"
                          ></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i
                            class="fab fa-twitter"
                            aria-controls="#picker-editor"
                          ></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i
                            class="fab fa-github"
                            aria-controls="#picker-editor"
                          ></i>
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
