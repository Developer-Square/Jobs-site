import React from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";

const GetStarted = ({
  btnColor = "#e6c018",
  textColor = "#fff",
  floatDirection = "right",
  buttonStyles = {},
}) => {
  const history = useHistory();
  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const handleRedirect = () => {
    history.push("/dashboard");
  };

  return isAuthenticated ? (
    <Button
      onClick={handleRedirect}
      size="small"
      title={`View Dashboard`}
      style={{
        fontSize: 15,
        color: textColor,
        backgroundColor: btnColor,
        float: floatDirection,
        ...buttonStyles,
      }}
    />
  ) : (
    <Button
      onClick={() => history.push(`/auth`)}
      size="small"
      title={`Get Started`}
      style={{
        fontSize: 15,
        color: textColor,
        backgroundColor: btnColor,
        float: floatDirection,
        ...buttonStyles,
      }}
    />
  );
};

export default GetStarted;
