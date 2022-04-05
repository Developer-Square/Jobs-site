import { toast } from "react-toastify";
import React, { createContext, memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "react-apollo";
import { GET_USER_DETAILS } from "graphql/queries";
import { DELETE_ADDRESS, UPDATE_ADDRESS } from "graphql/mutations";
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
  refetchUser: false,
  userLoading: false,
  userType: null,
  userData: null,
  logout: async () => {},
  loginWithGoogle: async () => {},
  loginAnonymously: async () => {},
  setRefetchUser: async () => {},
  getUser: async () => {},
  fetchUser: async () => {},
  updateAddress: async () => {},
  deleteAddress: async () => {},
  deleteAccount: async () => {},
  setUserType: async () => {},
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(localStorage.getItem("thedb_user"));
  const [refetchUser, setRefetchUser] = useState(false);
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext(AuthContext);
  const navigate = useHistory();
  const [fetchUser, { data: userData, loading: userLoading }] = useLazyQuery(
    GET_USER_DETAILS,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        setUser(data?.me);
      },
    },
  );
  const [accountAddressDelete] = useMutation(DELETE_ADDRESS);
  const [accountAddressUpdate] = useMutation(UPDATE_ADDRESS);

  const getUser = async () => {
    if (!user) {
      await fetchUser();
    } else {
      return user;
    }
  };

  useEffect(() => {
    if (!user && isAuthenticated) {
      getUser();
      setRefetchUser((curr) => !curr);
    }
    if (user && !isAuthenticated) {
      setUser(null);
      setRefetchUser((curr) => !curr);
    }
    if (!user && !isAuthenticated) {
      setRefetchUser((curr) => !curr);
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, fetchUser]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchUser]);

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

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        logout,
        fetchUser,
        refetchUser,
        setRefetchUser,
        updateAddress,
        deleteAddress,
        deleteAccount,
        setUserType,
        userType,
        userData,
        userLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

const memoizedProvider = memo(UserProvider);

export { memoizedProvider as UserProvider };
