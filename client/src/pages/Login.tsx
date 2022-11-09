import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn } from "../features/userSlice";
import { loginUser } from "../services/userServices";
import { UserLogin } from "../types/types";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values: UserLogin, { resetForm }) => {
      try {
        const res = await loginUser(values);
        dispatch(setLoggedIn());
        toast.success(res.message);
        resetForm({});
        navigate("/profile");
      } catch (error: any) {
        console.log(error);
        // toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="register">
      <ToastContainer />
      <h1>Login:</h1>
      <div className="card">
        <form onSubmit={formik.handleSubmit}>
          <div className="form__section">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button type="submit">Login</button>
          </div>
          <button
            className="verificationBtn"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
};
