import React, { useEffect, useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useRouteMatch, useHistory } from "react-router-dom";
import { TypedVerifyEmailMutation } from "./mutations";
import { maybe } from "core/utils";
import { normalizeErrors } from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import { HelperText, Heading, SubHeading } from "./Authentication.style";

const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => !data.sendPasswordResetEmail.errors.length);
  const nonFieldErr = normalizeErrors(
    maybe(() => data.verifyAccount.errors, [])
  );

  if (nonFieldErr) {
    alert.show(
      {
        title: nonFieldErr?.nonFieldErrors,
      },
      { type: "error", timeout: 5000 }
    );
  }
  if (successful) {
    alert.show(
      {
        title: data.sendPasswordResetEmail.requiresConfirmation
          ? "Please check your e-mail for further instructions"
          : "New user has been created",
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const EmailActivation = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const alert = useAlert();
  const [token] = useState(match.params.emailToken);
  const { authDispatch } = useContext(AuthContext);
  useEffect(() => {
    authDispatch({
      type: "ACTIVATE_ACCOUNT",
    });
    return () => {
      authDispatch({
        type: "SIGNIN",
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    authDispatch({
      type: "SIGNIN",
    });
    history.push(`/auth`);
  };

  return (
    <TypedVerifyEmailMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(verifyAccount, { loading, data }) => {
        function confirmActivation() {
          verifyAccount({
            variables: { token: token },
          });
        }
        console.log(maybe(() => data.verifyAccount.errors, []));
        if (data?.verifyAccount) {
          if (data.verifyAccount?.success) {
            console.log("data received", data);
            history.push("/auth");
          }
        }
        return (
          <>
            <div
              id="titlebar"
              className="photo-bg"
              style={{
                backgroundImage: "url(images/all-categories-photo.jpg)",
              }}
            >
              <div className="container">
                <div className="ten columns">
                  <h2>Account Activation</h2>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="my-account">
                <div className="tabs-container">
                  <div
                    className="tab-content"
                    style={{
                      width: "fit-content",
                      margin: "0 auto",
                    }}
                  >
                    <Heading>Hello, Welcome Back!</Heading>
                    <SubHeading>
                      Click the button below to activate your Account
                    </SubHeading>

                    <h1
                      style={{
                        margin: "10px",
                        color: data?.verifyAccount?.success ? "green" : "blue",
                      }}
                    >
                      {data?.verifyAccount?.success ? (
                        "Verification Successful ✔"
                      ) : (
                        <Button
                          title="Activate Account"
                          onClick={confirmActivation}
                        />
                      )}
                    </h1>
                    {maybe(
                      () => !data?.sendPasswordResetEmail?.errors?.length
                    ) ? null : (
                      <HelperText>
                        <p class=" lost_password">
                          <a onClick={handleLogin} href>
                            Login to continue
                          </a>
                        </p>
                      </HelperText>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </TypedVerifyEmailMutation>
  );
};

export default EmailActivation;
