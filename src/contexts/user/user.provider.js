// import { pick } from "lodash";
import { toast } from "react-toastify";
import React, { createContext, memo, useEffect, useState } from "react";
// import useAuthState from "hooks/useAuthState";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo";
import { GET_USER_DETAILS } from "./query";
import { AuthContext } from "contexts/auth/auth.context";

const defaultUser = {
  uid: null,
  email: null,
  displayName: null,
  isAnonymous: false,
};

const defaultState = {
  loading: false,
  user: defaultUser,
  logout: async () => {},
  loginWithGoogle: async () => {},
  loginAnonymously: async () => {},
  deleteAccount: async () => {},
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useHistory();
  const { data, loading, error } = useQuery(GET_USER_DETAILS);
  // eslint-disable-next-line no-undef
  const { authDispatch } = React.useContext(AuthContext);

  const getUser = async () => {
    if (data) {
      await setUser(data.me);
      return { user, loading, error };
    }
  };

  useEffect(() => {
    // const localUser = JSON.parse(localStorage.getItem("thedb_auth_profile"));
    // if (localUser) {
    //   setUser(localUser);
    // } else {
    //   getUser();
    // }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("darasa_auth_profile");
      localStorage.removeItem("darasa_auth_payload");
      localStorage.removeItem("darasa_auth_roles");
      localStorage.removeItem("darasa_applications");
      localStorage.removeItem("darasa_org_profile");
      localStorage.removeItem("darasa_individual_profile");
      authDispatch({ type: "SIGN_OUT" });
      setUser(null);
      navigate.push("/");
    }
  };

  const deleteAccount = async () => {
    // const { currentUser } = firebase.auth();
    // const deleteUser = firebase.functions().httpsCallable("deleteUser");

    // await deleteUser();

    try {
      // await currentUser.delete();
    } catch (error) {
      toast.error(error.message);
    } finally {
      await logout();
      toast(
        "It's sad to see you go, but we respect your privacy. All your data has been deleted successfully. Hope to see you again soon!",
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

const memoizedProvider = memo(UserProvider);

export { memoizedProvider as UserProvider };
