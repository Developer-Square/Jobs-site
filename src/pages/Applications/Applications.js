import React from "react";

import { useAlert } from "react-alert";
import Table from "components/Table/Table";
import { Grid } from "components/Grid/Grid";
import { ActionButton } from "styles/pages.style";
// import { useSidebar } from "context/sidebar/use-sidebar";
import { toast } from "react-toastify";

import Button from "components/Button/Button";
import { PencilIcon } from "components/AllSvgIcon";
// import Slide from "containers/Slide/Slide";
// import EditPostCompany from "./EditPostCompany";

import { CSVDownloader } from "react-papaparse";
import thedbLogo from "image/thedb.png";
// import { makeSecretKey } from "utils";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import { GET_APPLICATIONS } from "graphql/queries";

import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { cleanSelectData, showNotification } from "helpers";
import { AuthContext } from "contexts/auth/auth.context";
import moment from "moment";
import ModalContext from "contexts/modal/modal.provider";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedApplicationsQuery = TypedQuery(GET_APPLICATIONS);

const Applications = ({ deviceType }) => {
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  const { emitter, events } = React.useContext(ModalContext);
  const [checkedId, setCheckedId] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [filename, setFileName] = React.useState("makeSecretKey(10)");
  console.log(filename);
  console.log(checkedId);
  let statusData;
  let applications;

  const alert = useAlert();

  const skipResetRef = React.useRef(false);

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [applications]);

  // const handleEdit = (d) => {
  //   toast.info(`To Edit ${d.applicant.fullName}'s application status`);
  // };
  const handleBulkGenerate = () => toast.info(`Feature coming soon!`);

  const handleBulkDelete = () =>
    toast.info(`To Delete ${checkedId.length} items`);

  const handleView = (d) =>
    toast.info(`To View ${d.applicant.fullName}'s application`);
  const handleEdit = (d) => emitter.emit(events.UPDATE_APPLICATION_MODAL, d);
  function onAllCheck(event) {
    if (!event.checked) {
      const idx =
        applications && applications.map((category) => parseInt(category.id));
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.checked);
  }
  function handleCheckbox(event) {
    const { id } = event;
    if (!checkedId.includes(id)) {
      setCheckedId((prevState) => [...prevState, id]);
    } else {
      setChecked(false);
      setCheckedId((prevState) => prevState.filter((id) => id !== event.id));
    }
  }
  // Input onChange handler
  const handleOnChange = (e) => {
    let currentValue = e.target.value;
    setFileName(currentValue);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <div>
            All Applications
            {checkedId.length > 0 && (
              <>
                <Button
                  style={{
                    background: "#e90b0bbf",
                    margin: "5px",
                    height: "25px",
                    padding: "0 10px",
                  }}
                  onClick={handleBulkDelete}
                  title={`Delete Selected`}
                />
                <input
                  type={`text`}
                  name={`filename`}
                  placeholder={`File Name`}
                  onChange={handleOnChange}
                />
                <CSVDownloader
                  data={
                    checkedId.length > 0
                      ? applications?.filter((application) =>
                          checkedId.includes(application.id),
                        )
                      : []
                  }
                  filename={filename}
                  bom={checkedId.length > 0 ? true : false}
                >
                  <Button
                    style={{
                      margin: "5px",
                      height: "25px",
                      padding: "0 10px",
                    }}
                    onClick={handleBulkGenerate}
                    title={`Generate excel for Selected`}
                  />
                </CSVDownloader>
              </>
            )}
          </div>
        ),
        id: "header",
        columns: [
          {
            Header: "Logo",
            id: "logo",
            hideFilter: true,
            accessor: (d) => {
              return (
                <p>
                  {profile && d ? (
                    <img
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: 50,
                        background: "#009e7f2e",
                      }}
                      src={
                        profile.isSeeker
                          ? d?.job?.creator?.avatar?.url || thedbLogo
                          : d?.applicant?.avatar?.url || thedbLogo
                      }
                      alt="the-user-logo"
                    />
                  ) : null}
                </p>
              );
            },
          },
          {
            Header: "Budget",
            accessor: "budget",
          },
          {
            Header: "Date Applied",
            id: "createdAt",
            accessor: (d) => {
              return <p>{moment(d.createdAt).format("YYYY-MM-DD ")}</p>;
            },
          },
          {
            Header: "Email",
            id: "email",
            accessor: (d) => {
              return (
                <p>
                  {profile && d
                    ? profile.isSeeker
                      ? d?.job?.creator?.email
                      : d?.applicant?.email
                    : null}
                </p>
              );
            },
          },
          {
            Header: "Status",
            id: "applicationStatus",
            accessor: (d) => {
              let statusType;
              if (statusData) {
                statusType = statusData?.find(
                  ({ value }) => value === d?.status,
                );
              }
              return <p>{statusType && statusType.label}</p>;
            },
          },
          {
            Header: "Job Title",
            id: "jobTitle",
            accessor: (d) => {
              return <p>{d?.job?.title}</p>;
            },
          },

          {
            id: "btns",
            hideFilter: true,
            Header: () => <h5>Actions</h5>,
            accessor: "",
            Cell: ({ row }) => {
              const { original } = row;
              return (
                <div
                  style={{
                    display: "inline-flex",

                    top: "10px",
                    right: "10px",
                    justifyContent: "center",
                    transition: "0.2s ease-in-out",
                  }}
                >
                  <ActionButton
                    onClick={() => handleEdit(original)}
                    className="edit-btn"
                  >
                    <PencilIcon />
                  </ActionButton>
                  <ActionButton
                    className="view-btn"
                    onClick={() => handleView(original)}
                  >
                    {/* <Eyes /> */}
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </ActionButton>
                </div>
              );
            },
          },
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checked, checkedId],
  );

  const tablePage = (props) => {
    return (
      <div style={{ display: "block", alignItems: "center" }}>
        <h2 className="logo-header">Applications</h2>

        {/* <Button
          onClick={() => {
            setEditData({});
            toggleSidebar();
          }}
          title={`Add Company`}
        />
        <Slide deviceType={deviceType}>
          {isOpen && (
            <EditPostCompany
              onCloseBtnClick={toggleSidebar}
              scrollbarHeight="100vh"
              editData={editData}
            />
          )}
        </Slide> */}
        <Grid>
          <Table
            columns={columns}
            data={props.data.applications}
            skipReset={skipResetRef.current}
            getToggleRowSelectedProps={(a) => {
              const { original, toggleRowSelected } = a;
              return {
                onClick: () => handleCheckbox(original),
                onChange: () => toggleRowSelected(),
              };
            }}
            getAllSelectedRowsProps={(a) => {
              return {
                onClick: () => onAllCheck(a),
              };
            }}
            getCellProps={(cellInfo, allCells) => ({
              style: {
                backgroundColor: `hsl(${
                  cellInfo.column.id === "score"
                    ? cellInfo < new Date()
                      ? "red"
                      : null
                    : null
                }, 100%, 67%)`,
              },
            })}
          />
        </Grid>
      </div>
    );
  };
  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedApplicationsQuery>
          {(applicationsList) => {
            if (applicationsList.loading) {
              return <Loader />;
            }
            let applicationStatus = [];
            if (applicationsList.data) {
              applicationStatus = cleanSelectData(
                applicationsList.data.__type.enumValues,
              );
              // setCompanies((curr) => applicationsList.data.applications);
              statusData = applicationStatus;
              applications = applicationsList.data.applications;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "Applications Page",
                  title: "Applications Page",
                }}
              >
                <TypedUpdateApplicationMutation
                  onCompleted={(data, errors) =>
                    showNotification(
                      data.patchApplication,
                      errors,
                      alert,
                      "accountErrors",
                      "Profile Created",
                    )
                  }
                >
                  {(patchApplication) => {
                    return tablePage(applicationsList);
                  }}
                </TypedUpdateApplicationMutation>
              </MetaWrapper>
            );
          }}
        </TypedApplicationsQuery>
      )}
    </NetworkStatus>
  );
};

export default Applications;
