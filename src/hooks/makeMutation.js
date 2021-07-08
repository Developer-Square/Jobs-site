import { getMutationStatus, maybe } from "../misc";
import { useMutation as useBaseMutation } from "react-apollo";

import { isJwtError } from "helpers/error.apollo";
import { useContext } from "react";
import UserContext from "contexts/user/user.provider";
import { toast } from "react-toastify";

function makeMutation(mutation) {
  function useMutation({ onCompleted, onError }) {
    const { user } = useContext(UserContext);

    const [mutateFn, result] = useBaseMutation(mutation, {
      onCompleted,
      onError: (err) => {
        if (
          maybe(
            () =>
              err.graphQLErrors[0].extensions.exception.code ===
              "ReadOnlyException",
          )
        ) {
          toast.error("Only read-only mode.");
        } else if (err.graphQLErrors.some(isJwtError)) {
          user.logout();
          toast.error(
            "Your session has expired. Please log in again to continue.",
          );
        } else {
          toast.error("TheDatabase Kenya ran into an unexpected problem");
        }
        if (onError) {
          onError(err);
        }
      },
    });

    return [
      mutateFn,
      {
        ...result,
        status: getMutationStatus(result),
      },
    ];
  }

  return useMutation;
}

export default makeMutation;
