import React, { useContext, useEffect, useState } from "react";
import InternshipsController from "./InternshipsController";
import { AuthContext } from "contexts/auth/auth.context";

function Internships() {
  const { authState, authDispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const toggleView = () => {
    authDispatch({
      type: "VIEW",
    });
  };
  const togglePost = () => {
    authDispatch({
      type: "POST",
    });
  };
  useEffect(() => {
    authDispatch({
      type: "VIEW",
    });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("auth state", authState);
  return (
    <>
      {loading ? (
        <>
          <button onClick={toggleView()}>View</button>
          <button onClick={togglePost()}>Post</button>
        </>
      ) : (
        <InternshipsController />
      )}
    </>
  );
}
export default Internships;
