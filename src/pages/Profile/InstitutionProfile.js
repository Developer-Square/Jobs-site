import React from "react";
import { useAlert } from "react-alert";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import { MetaWrapper } from "components/Meta";

import { cleanSelectData, setFieldErrors, showNotification } from "helpers";
import {
  TypedInstitutionProfileMutation,
  TypedInstitutionUpdateMutation,
} from "./mutations";
import { TypedInstitutionStudentCountQuery } from "./queries";
import { objDiff } from "utils";
import { isEmpty } from "lodash";
import UserContext from "contexts/user/user.provider";
import InstitutionForm from "./InstitutionForm";

const InstitutionProfile = () => {
  const alert = useAlert();
  const { user, setRefetchUser } = React.useContext(UserContext);
  const [updating, setUpdating] = React.useState(false);

  const initialData = {
    studentCount: null,
    description: "",
    name: "",
    website: "https://",
    country: "",
    location: "",
    mobile: "",
    regNo: 0,
  };

  // console.log(getDBIdFromGraphqlId("RW1wbG95ZXJOb2RlOjE=", "InstitutionNode"));
  // console.log(getGraphqlIdFromDBId(1, "InstitutionNode"));

  const cleanFormData = (data, oldData) => {
    const studentCount = data.studentCount.value;

    const originalObject = {
      ...oldData,
      studentCount: studentCount,
    };
    const newObject = {
      ...data,
      studentCount: studentCount,
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
  const cleanInitialValues = (data, studentCount) => {
    const obj = {
      studentCount: studentCount.find(
        ({ value }) => value === data?.studentCount,
      ),
      description: data.description,
      name: data.name,
      website: data.website,
      country: data.country,
      location: data.location,
      mobile: data.mobile,
      regNo: data.regNo,
    };
    return obj;
  };
  if (!user) {
    return <Loader />;
  }

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedInstitutionStudentCountQuery>
          {(studentCount) => {
            if (studentCount.loading) {
              return <Loader />;
            }
            let students = [];
            if (studentCount.data) {
              students = cleanSelectData(studentCount.data.__type.enumValues);
            }
            let initialValues = initialData;
            if (user?.isInstitution && user.institution) {
              setUpdating(true);
              initialValues = cleanInitialValues(user?.institution, students);
            } else {
              setUpdating(false);
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: user.employer
                    ? "Institution Profile creation"
                    : user?.employer?.descriptionPlaintext,
                  title: user.username,
                }}
              >
                <TypedInstitutionProfileMutation
                  onCompleted={(data, errors) =>
                    showNotification(
                      data.institutionCreate,
                      errors,
                      alert,
                      "accountErrors",
                      "Profile Created",
                    )
                  }
                >
                  {(institutionCreate) => {
                    return (
                      <TypedInstitutionUpdateMutation
                        onCompleted={(data, errors) =>
                          showNotification(
                            data.InstitutionPatch,
                            errors,
                            alert,
                            "accountErrors",
                            "Profile Updated",
                          )
                        }
                      >
                        {(institutionUpdate) => {
                          function onSubmit(values, { setErrors }) {
                            const variables = {
                              variables: cleanFormData(values, initialValues),
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
                                ? institutionUpdate(variables)
                                : institutionCreate(variables);
                              mutationFn.then(({ data }) => {
                                if (data) {
                                  setFieldErrors(
                                    updating
                                      ? data.institutionUpdate
                                      : data.institutionCreate,
                                    setErrors,
                                  );
                                  setRefetchUser((curr) => !curr);
                                }
                              });
                            }
                          }
                          return (
                            <InstitutionForm
                              initialValues={initialValues}
                              onSubmit={onSubmit}
                              loading={
                                updating
                                  ? institutionUpdate.loading
                                  : institutionCreate.loading
                              }
                              studentCount={students}
                            />
                          );
                        }}
                      </TypedInstitutionUpdateMutation>
                    );
                  }}
                </TypedInstitutionProfileMutation>
              </MetaWrapper>
            );
          }}
        </TypedInstitutionStudentCountQuery>
      )}
    </NetworkStatus>
  );
};

export default InstitutionProfile;
