import { debounce } from "lodash";
import React, { createContext, memo, useState } from "react";
// import ShortUniqueId from "short-unique-id";
// import UserContext from "contexts/user/user.provider";
// import { getUnsplashPhoto } from "utils";
// import initialState from "data/initialState.json";
// import { useMutation, useQuery } from "react-apollo";
// import { toast } from "react-toastify";

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
  // const dictionary = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
  // const uuid = new ShortUniqueId({ dictionary });

  const [isUpdating, setUpdating] = useState(false);
  // const { user } = useContext(UserContext);
  // const refr = useQuery(GET_RESUME, {
  //   variables: { id },
  // });
  // const [createResume] = useMutation();
  // const createResume = toast("To Handle create resume");
  const createResume = console.log("To Handle create resume");

  const getResume = async (id) => {
    try {
      // const snapshot = await firebase
      //   .database()
      //   .ref(`resumes/${id}`)
      //   .once("value");
      // return snapshot.val();
    } catch (error) {
      return null;
    }
  };

  const duplicateResume = async (originalResume) => {
    // const id = uuid();
    // const preview = await getUnsplashPhoto();
    // const createdAt = firebase.database.ServerValue.TIMESTAMP;
    // const resume = {
    //   ...originalResume,
    //   // id,
    //   name: `${originalResume.name} Copy`,
    //   preview,
    // };
    // firebase.database().ref(`resumes/${id}`).set(resume);
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
    // await firebase.database().ref(`/resumes/${id}`).remove();
  };

  return (
    <DatabaseContext.Provider
      value={{
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