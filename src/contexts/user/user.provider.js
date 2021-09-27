// import { pick } from "lodash";
import { toast } from "react-toastify";
import React, { createContext, memo, useEffect, useState } from "react";
// import useAuthState from "hooks/useAuthState";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "react-apollo";
import { GET_USER_DETAILS } from "graphql/queries";
import { DELETE_ADDRESS, UPDATE_ADDRESS } from "graphql/mutations";
import { AuthContext } from "contexts/auth/auth.context";
import { objDiff } from "utils";
import { isEmpty } from "lodash";

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
  const [refetchUser, setRefetchUser] = useState(false);
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext(AuthContext);
  const navigate = useHistory();
  const [fetchUser, { data: userData }] = useLazyQuery(GET_USER_DETAILS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log("data");
      console.log(data?.me);
      setUser(data?.me);
    },
  });
  const [accountAddressDelete] = useMutation(DELETE_ADDRESS);
  const [accountAddressUpdate] = useMutation(UPDATE_ADDRESS);

  const getUser = async () => {
    console.log("getUser");
    if (!user) {
      console.log("await fetchUser");
      await fetchUser();
    } else {
      return user;
    }
  };

  useEffect(() => {
    if (!user && isAuthenticated) {
      console.log("!user && isAuthenticated");
      getUser();
      setRefetchUser((curr) => !curr);
    }
    if (user && !isAuthenticated) {
      console.log("user && !isAuthenticated");
      setUser(null);
      setRefetchUser((curr) => !curr);
    }
    if (!user && !isAuthenticated) {
      console.log("!user && !isAuthenticated");
      setRefetchUser((curr) => !curr);
      setUser(null);
    }
    console.log("in useEffect");
    // if (isAuthenticated) {
    //   fetchUser();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, fetchUser]);
  // if (!user && isAuthenticated) {
  //   getUser();
  // }

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchUser]);

  // console.log(objDiff(user, userData?.me));
  // console.log(isEmpty(objDiff(user, userData?.me)));
  // if (objDiff(user, userData?.me)) {
  //   setUser(userData?.me);
  // }

  const updateAddress = async (address) => {
    try {
      await accountAddressUpdate({
        variables: {
          ...address,
        },
      }).then(({ data }) => {
        return data?.resumePatch?.resume;
      });
    } catch (error) {
      console.log("updateAddress error", error);
      return null;
    }
  };

  const deleteAddress = async (id) => {
    const { data } = await accountAddressDelete({
      variables: { id: id },
    });
    return data?.accountAddressDelete;
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      authDispatch({ type: "SIGN_OUT" });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("thedb_auth_profile");
      localStorage.removeItem("thedb_auth_payload");
      localStorage.removeItem("thedb_auth_roles");
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
  console.log("user");
  console.log(user);
  console.log(!user);
  console.log("isAuthenticated");
  console.log(isAuthenticated);

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        logout,
        refetchUser,
        setRefetchUser,
        updateAddress,
        deleteAddress,
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
