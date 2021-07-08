import React from "react";
import { Mutation } from "react-apollo";

export function TypedMutation(mutation, update) {
  return (props) => {
    const { children, onCompleted, onError, variables } = props;
    return (
      <Mutation
        mutation={mutation}
        onCompleted={onCompleted}
        onError={onError}
        variables={variables}
        update={update}
      >
        {children}
      </Mutation>
    );
  };
}
