/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Authentication = () => {
  return (
    <div className="container">
      <div className="my-account">
        <ul className="tabs-nav">
          <li className>
            <a href="#tab1">Login</a>
          </li>
          <li>
            <a href="#tab2">Register</a>
          </li>
        </ul>
        <div className="tabs-container">
          {/* Login */}
          <div className="tab-content" id="tab1" style={{ display: "none" }}>
            <form method="post" className="login">
              <p className="form-row form-row-wide">
                <label htmlFor="username">
                  Username:
                  <i className="ln ln-icon-Male" />
                  <input
                    type="text"
                    className="input-text"
                    name="username"
                    id="username"
                    defaultValue
                  />
                </label>
              </p>
              <p className="form-row form-row-wide">
                <label htmlFor="password">
                  Password:
                  <i className="ln ln-icon-Lock-2" />
                  <input
                    className="input-text"
                    type="password"
                    name="password"
                    id="password"
                  />
                </label>
              </p>
              <p className="form-row">
                <input
                  type="submit"
                  className="button border fw margin-top-10"
                  name="login"
                  defaultValue="Login"
                />
                <label htmlFor="rememberme" className="rememberme">
                  <input
                    name="rememberme"
                    type="checkbox"
                    id="rememberme"
                    defaultValue="forever"
                  />{" "}
                  Remember Me
                </label>
              </p>
              <p className="lost_password">
                <a href="#">Lost Your Password?</a>
              </p>
            </form>
          </div>
          {/* Register */}
          <div className="tab-content" id="tab2" style={{ display: "none" }}>
            <form method="post" className="register">
              <p className="form-row form-row-wide">
                <label htmlFor="username2">
                  Username:
                  <i className="ln ln-icon-Male" />
                  <input
                    type="text"
                    className="input-text"
                    name="username"
                    id="username2"
                    defaultValue
                  />
                </label>
              </p>
              <p className="form-row form-row-wide">
                <label htmlFor="email2">
                  Email Address:
                  <i className="ln ln-icon-Mail" />
                  <input
                    type="text"
                    className="input-text"
                    name="email"
                    id="email2"
                    defaultValue
                  />
                </label>
              </p>
              <p className="form-row form-row-wide">
                <label htmlFor="password1">
                  Password:
                  <i className="ln ln-icon-Lock-2" />
                  <input
                    className="input-text"
                    type="password"
                    name="password1"
                    id="password1"
                  />
                </label>
              </p>
              <p className="form-row form-row-wide">
                <label htmlFor="password2">
                  Repeat Password:
                  <i className="ln ln-icon-Lock-2" />
                  <input
                    className="input-text"
                    type="password"
                    name="password2"
                    id="password2"
                  />
                </label>
              </p>
              <p className="form-row">
                <input
                  type="submit"
                  className="button border fw margin-top-10"
                  name="register"
                  defaultValue="Register"
                />
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
