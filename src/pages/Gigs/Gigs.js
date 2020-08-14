/* eslint-disable react-hooks/rules-of-hooks */

// import React, { useEffect, useCallback, useContext } from "react";
// import Controller from "pages/common/Controller";
// import { useStickyDispatch } from "contexts/app/app.provider";
// import { AuthContext } from "contexts/auth/auth.context";

// function Gigs() {
//   const useDispatch = useStickyDispatch();
//   const setAppState = useCallback(() => useDispatch({ type: "VIEW" }), [
//     useDispatch,
//   ]);
//   const {
//     authState: { profile },
//   } = useContext(AuthContext);
//   useEffect(() => {
//     setAppState();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <Controller
//       type={`gigs`}
//       name={`Gig`}
//       isBusiness={profile.is_business}
//       isIndividual={profile.is_individual}
//     />
//   );
// }

// export default Gigs;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useCallback } from "react";
import GigsController from "./GigsController";
import { useStickyDispatch } from "contexts/app/app.provider";

function Gigs() {
  const useDispatch = useStickyDispatch();
  const setAppState = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  useEffect(() => {
    setAppState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <GigsController />;
}
export default Gigs;
