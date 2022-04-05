import React from "react";
import { useAlert } from "react-alert";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import { MetaWrapper } from "components/Meta";

import { cleanSelectData, setFieldErrors, showNotification } from "helpers";
import {
  TypedEmployerProfileMutation,
  TypedEmployerUpdateMutation,
} from "./mutations";

import { objDiff } from "utils";
import { isEmpty } from "lodash";
import UserContext from "contexts/user/user.provider";
import EmployerForm from "./EmployerForm";
import { TypedQuery } from "core/queries";
import { GET_INDUSTRIES, EmployerWorkForce } from "graphql/queries";

const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);
const TypedEmployerWorkForceQuery = TypedQuery(EmployerWorkForce);

const EmployerProfile = () => {
  const alert = useAlert();
  const { user, setRefetchUser } = React.useContext(UserContext);
  const [updating, setUpdating] = React.useState(false);

  const initialData = {
    workForce: null,
    description: "",
    name: "",
    website: "https://",
    country: "",
    location: "",
    mobile: "",
    regNo: 0,
    lookingFor: "",
    industries: [],
  };

  // console.log(getDBIdFromGraphqlId("RW1wbG95ZXJOb2RlOjE=", "EmployerNode"));
  // console.log(getGraphqlIdFromDBId(1, "EmployerNode"));

  const cleanIndustries = (data) => {
    return data.reduce((arr, b) => {
      arr.push({
        value: b.id,
        label: b.name,
      });
      return arr;
    }, []);
  };

  const cleanFormData = (data, oldData) => {
    const workForce = data?.workForce?.value;
    const industries = data?.industries.reduce((arr, b) => {
      arr.push(b.value);
      return arr;
    }, []);

    const originalObject = {
      ...oldData,
      workForce: workForce,
      industries: industries,
    };
    const newObject = {
      ...data,
      workForce: workForce,
      industries: industries,
    };

    const id = updating ? { id: user?.employer?.id } : {};
    const formData = isEmpty(objDiff(originalObject, newObject, "id"))
      ? null
      : {
          ...newObject,
          ...id,
        };

    return formData;
  };
  const cleanInitialValues = (data, industries, workForce) => {
    const obj = {
      workForce: workForce.find(({ value }) => value === data?.workForce),
      description: data?.description,
      name: data?.name,
      website: data?.website,
      country: data?.country,
      location: data?.location,
      mobile: data?.mobile,
      regNo: data?.regNo,
      lookingFor: data?.lookingFor,
      industries: data?.industries?.reduce((acc, ind) => {
        acc.push({ value: ind.id, label: ind.name });
        return acc;
      }, []),
    };
    return obj;
  };
  if (!user) {
    return <Loader />;
  }

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedEmployerWorkForceQuery>
          {(employerWorkForce) => {
            if (employerWorkForce.loading) {
              return <Loader />;
            }

            let workForceCount = [];
            if (employerWorkForce.data) {
              workForceCount = cleanSelectData(
                employerWorkForce.data.__type.enumValues,
              );
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <TypedIndustriesQuery>
                {(industriesData) => {
                  if (industriesData.loading) {
                    return <Loader />;
                  }
                  let industries = [];
                  if (industriesData.data) {
                    industries = cleanIndustries(
                      industriesData.data.allIndustries,
                    );
                  }
                  let initialValues = initialData;
                  if (user?.isEmployer && user.employer) {
                    setUpdating(true);
                    initialValues = cleanInitialValues(
                      user?.employer,
                      industries,
                      workForceCount,
                    );
                  } else {
                    setUpdating(false);
                  }

                  return (
                    <MetaWrapper
                      meta={{
                        description: user.employer
                          ? "Employer Profile creation"
                          : user?.employer?.descriptionPlaintext,
                        title: user.username,
                      }}
                    >
                      <TypedEmployerProfileMutation
                        onCompleted={(data, errors) =>
                          showNotification(
                            data.employerCreate,
                            errors,
                            alert,
                            "accountErrors",
                            "Profile Created",
                          )
                        }
                      >
                        {(employerCreate) => {
                          return (
                            <TypedEmployerUpdateMutation
                              onCompleted={(data, errors) =>
                                showNotification(
                                  data.employerPatch,
                                  errors,
                                  alert,
                                  "accountErrors",
                                  "Profile Updated",
                                )
                              }
                            >
                              {(employerUpdate) => {
                                function onSubmit(values, { setErrors }) {
                                  const variables = {
                                    variables: cleanFormData(
                                      values,
                                      initialValues,
                                    ),
                                  };
                                  if (!cleanFormData(values, initialValues)) {
                                    showNotification(
                                      null,
                                      null,
                                      alert,
                                      null,
                                      "No Chages Were Made",
                                    );
                                  } else {
                                    const mutationFn = updating
                                      ? employerUpdate(variables)
                                      : employerCreate(variables);
                                    mutationFn.then(({ data }) => {
                                      if (data) {
                                        setFieldErrors(
                                          updating
                                            ? data.employerUpdate
                                            : data.employerCreate,
                                          setErrors,
                                        );
                                        setRefetchUser((curr) => !curr);
                                      }
                                    });
                                  }
                                }
                                return (
                                  <EmployerForm
                                    initialValues={initialValues}
                                    onSubmit={onSubmit}
                                    loading={
                                      updating
                                        ? employerUpdate.loading
                                        : employerCreate.loading
                                    }
                                    industries={industries}
                                    workForce={workForceCount}
                                  />
                                );
                              }}
                            </TypedEmployerUpdateMutation>
                          );
                        }}
                      </TypedEmployerProfileMutation>
                    </MetaWrapper>
                  );
                }}
              </TypedIndustriesQuery>
            );
          }}
        </TypedEmployerWorkForceQuery>
      )}
    </NetworkStatus>
  );
};

export default EmployerProfile;
