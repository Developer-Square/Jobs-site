import { debounce } from "lodash";
import React, { createContext, memo, useState } from "react";
// import ShortUniqueId from "short-unique-id";
// import UserContext from "contexts/user/user.provider";
// import { getUnsplashPhoto } from "utils";
// import initialState from "data/initialState.json";
import { useLazyQuery, useMutation } from "react-apollo";
import { toast } from "react-toastify";
import { DUPLICATE_RESUME, DELETE_RESUME } from "graphql/mutations";
import { FETCH_RESUME } from "graphql/queries";

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
  const [resume, { data }] = useLazyQuery(FETCH_RESUME);

  const createResume = () => console.log("To Handle create resume");

  const getResume = async (id) => {
    try {
      await resume({
        variables: {
          id: id,
        },
      });
      return data?.resume;
    } catch (error) {
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

    // await firebase
    //   .database()
    //   .ref(`resumes/${resume.id}`)
    //   .update({
    //     ...resume,
    //     // updatedAt: firebase.database.ServerValue.TIMESTAMP,
    //   });

    setUpdating(false);
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
