import React, { createContext, memo, useState } from "react";
import { debounce } from "lodash";
import omitDeep from "omit-deep-lodash";
import { useLazyQuery, useMutation } from "react-apollo";
import { toast } from "react-toastify";
import {
  DUPLICATE_RESUME,
  DELETE_RESUME,
  UPDATE_RESUME,
} from "graphql/mutations";
import { FETCH_RESUME } from "graphql/queries";
import UserContext from "contexts/user/user.provider";

const DEBOUNCE_WAIT_TIME = 4000;

const defaultState = {
  isUpdating: false,
  createResume: async () => {},
  duplicateResume: async () => {},
  deleteResume: () => {},
  getResume: async () => {},
  getResumes: async () => {},
  updateResume: async () => {},
  debouncedUpdateResume: async () => {},
};

const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({ children }) => {
  const [refetchResumes, setRefetchResumes] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [duplicateResumeMutation] = useMutation(DUPLICATE_RESUME);
  const [deleteResumeMutation] = useMutation(DELETE_RESUME);
  const [resume, resumeDataResponse] = useLazyQuery(FETCH_RESUME);
  const [resumePatch] = useMutation(UPDATE_RESUME);
  const { setRefetchUser } = React.useContext(UserContext);

  const createResume = () => console.log("To Handle create resume");

  const getResume = async (id) => {
    try {
      await resume({
        variables: {
          id: id,
        },
      });
      console.log(resumeDataResponse);
      return omitDeep(resumeDataResponse?.data?.resume, "__typename");
    } catch (error) {
      console.log("getResume error", error);
      return null;
    }
  };

  const duplicateResume = async (originalResume) => {
    const { data } = await duplicateResumeMutation({
      variables: { id: originalResume.id },
    });
    if (data?.duplicateResume?.success) {
      setRefetchResumes(true);
      toast.success(`${data?.duplicateResume?.resume?.name} Created`);
    }
    setRefetchResumes(false);
  };

  const updateResume = async (resume) => {
    setUpdating(true);
    try {
      await resumePatch({
        variables: {
          ...resume,
        },
      }).then(({ data }) => {
        return omitDeep(data?.resumePatch?.resume, "__typename");
      });
      setUpdating(false);
    } catch (error) {
      console.log("updateResume error", error);
      setUpdating(false);
      return null;
    }
    setRefetchUser((prev) => !prev);
  };

  const debouncedUpdateResume = debounce(updateResume, DEBOUNCE_WAIT_TIME);

  const deleteResume = async (id) => {
    const { data } = await deleteResumeMutation({
      variables: { id: id },
    });
    if (data?.resumeDelete?.success) {
      setRefetchResumes(true);
    }
    setRefetchResumes(false);
  };

  return (
    <DatabaseContext.Provider
      value={{
        refetchResumes,
        setRefetchResumes,
        isUpdating,
        getResume,
        createResume,
        duplicateResume,
        updateResume,
        deleteResume,
        debouncedUpdateResume,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;

const memoizedProvider = memo(DatabaseProvider);

export {
  memoizedProvider as DatabaseProvider,
  DEBOUNCE_WAIT_TIME as DebounceWaitTime,
};
