import React from "react";
import { Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { showNotification } from "helpers";

import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import ModalContext from "contexts/modal/modal.provider";
import { UPDATE_APPLICATION } from "graphql/mutations";
import { ApplicationStatus } from "graphql/queries";
import DataModal from "./DataModal";
import ModalEvents from "../constants/ModalEvents";
import userImage from "image/user.jpg";
import { Link } from "react-router-dom";
import Loader from "components/Loader/Loader";
import { cleanSelectData } from "helpers";
// import { getStatus } from "utils/vacancy";
import moment from "moment";

export const TypedApplicationMutation = TypedMutation(UPDATE_APPLICATION);
const TypeStatusTypes = TypedQuery(ApplicationStatus);

const UpdateApplicationModal = () => {
  const [data, setData] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("view");
  const { emitter } = React.useContext(ModalContext);
  console.log(data);
  let initialData = {
    employerComment: "",
    status: "",
  };

  React.useEffect(() => {
    const unbind = emitter.on(
      ModalEvents.UPDATE_APPLICATION_MODAL,
      (payload) => {
        setData(payload);
        // setInitialData({
        //   employerComment: payload?.employerComment,
        //   status: getStatus(payload?.status),
        // });
      },
    );

    return () => unbind();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emitter, ModalEvents]);

  const cleanInitialValues = (data, statusType) => {
    return {
      employerComment: data?.employerComment,
      status: statusType.find(({ value }) => value === data?.status),
    };
  };
  const handleActiveTab = (type) => {
    setActiveTab(type);
  };

  return (
    <TypedApplicationMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.updateApplication,
          errors,
          null,
          "errors",
          "Application Updated",
        )
      }
    >
      {(applicationUpdate) => {
        return (
          <TypeStatusTypes>
            {(statusData) => {
              if (statusData.loading) {
                return <Loader />;
              }
              if (statusData.loading) return <div />;
              let statusTypes = [];
              if (statusData.data) {
                statusTypes = cleanSelectData(
                  statusData.data.__type.enumValues,
                );
              }
              let initialValues = initialData;
              initialValues = cleanInitialValues(data, statusTypes);
              return (
                <Formik initialValues={initialValues} enableReinitialize>
                  {(formik) => (
                    <DataModal
                      title={{
                        create: `${data?.applicant.fullName}'s Application`,
                        edit: `${data?.applicant.fullName}'s Application`,
                      }}
                      buttonText={`Update Application`}
                      onEdit={(formdata) => {
                        applicationUpdate({
                          variables: {
                            id: data?.id,
                            employerComment:
                              formdata?.variables?.employerComment,
                            status: formdata?.variables?.status.value,
                          },
                        });
                      }}
                      onCreate={applicationUpdate}
                      event={ModalEvents.UPDATE_APPLICATION_MODAL}
                    >
                      <div className="application">
                        <div className="app-content" style={{ padding: "5px" }}>
                          <div className="info">
                            <img
                              src={data?.applicant?.avatar?.url || userImage}
                              alt="application"
                            />
                            <span>
                              <div className="buttons">
                                <Link
                                  to={{ pathname: "" }}
                                  onClick={() => handleActiveTab("edit")}
                                  className="button gray app-link"
                                >
                                  <i className="fa fa-pencil" /> Edit & Add Note
                                </Link>
                                <Link
                                  to={{ pathname: "" }}
                                  onClick={() => handleActiveTab("view")}
                                  className="button gray app-link"
                                >
                                  <i className="fa fa-plus-circle" /> Show
                                  Details
                                </Link>
                              </div>
                            </span>
                          </div>
                          <div className="clearfix" />
                        </div>

                        <div className="clearfix" />
                        <div className="app-tabs">
                          <div className="app-tab-content">
                            {activeTab === "edit" && (
                              <>
                                <FormikControl
                                  control="select"
                                  hideButton={() => {}}
                                  label="Application Status"
                                  name="status"
                                  style={{ margin: 0 }}
                                  options={statusTypes}
                                  defaultValue={formik.values.status}
                                />
                                <FormikControl
                                  control="textarea"
                                  label="A comment regarding this candidate."
                                  name="employerComment"
                                  rte={false}
                                  fullWidth
                                />
                              </>
                            )}
                            {activeTab === "view" && (
                              <>
                                <i>Name:</i>
                                <span>{data?.applicant.fullName}</span>
                                <i>Email:</i>
                                <span>
                                  <a href={`mailto:${data?.applicant?.email}`}>
                                    {data?.applicant?.email}
                                  </a>
                                </span>
                                <i>Message:</i>
                                <span>{data?.comment}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="app-footer">
                          <ul>
                            <li>
                              <i className="fa fa-file-text-o" /> New
                            </li>
                            <li>
                              <i className="fa fa-calendar" />
                              {moment(data?.createdAt).format("MMM Do YY")}
                            </li>
                          </ul>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </DataModal>
                  )}
                </Formik>
              );
            }}
          </TypeStatusTypes>
        );
      }}
    </TypedApplicationMutation>
  );
};

export default UpdateApplicationModal;
