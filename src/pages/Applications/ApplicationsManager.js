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

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedApplicationsQuery = TypedQuery(GET_APPLICATIONS);

const ApplicationsManager = ({ deviceType }) => {
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  const [checkedId, setCheckedId] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  // const [editData, setEditData] = React.useState({});
  const [filename, setFileName] = React.useState("makeSecretKey(10)");
  // const { isOpen, toggleSidebar } = useSidebar();
  console.log(filename);
  console.log(checkedId);
  let statusData;
  let applications;

  const alert = useAlert();

  const skipResetRef = React.useRef(false);

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [applications]);

  const handleEdit = (d) => {
    // toggleSidebar();
    toast.info(`To Edit ${d.applicant.fullName}'s application status`);
    // setEditData(d);
  };
  const handleBulkGenerate = () => {
    toast.info(`Generated ${checkedId.length} items on CSV`);
  };
  const handleBulkDelete = () => {
    toast.info(`To Delete ${checkedId.length} items`);
    // if (checkedId.length > 0) {
    //   axiosInstance
    //     .delete(`library/product/bulk_delete/?ids=${checkedId.toString()}`)
    //     .then((res) => {
    //       setProducts([]);
    //       getProducts();
    //       alert.info(`${res.data.length} Items deleted`);
    //       for (let i = 0; i < checkedId.length; i++) {
    //         const product_instance = checkedId[i];
    //         alert.error(
    //           `${
    //             dummydata.filter(
    //               (filteredObj) => filteredObj.id === product_instance
    //             )[0].name
    //           } Deleted`
    //         );
    //       }
    //     });
    // } else {
    //   alert.info("make a selection to continue");
    // }
  };
  const handleView = (d) => {
    // history.push(`/application/${d.id}/`);
    toast.info(`To View ${d.applicant.fullName}'s application`);
  };
  // const handleDelete = (d) => {
  //   toast.info(`To Delete ${d.job.title}`);
  //   // const cta = () =>
  //   //   axiosInstance
  //   //     .delete(`/library/product/${d.id}/`, d, tokenConfig())
  //   //     .then((res) => {
  //   //       alert.error(`${res.data.name} Deleted`);
  //   //     })
  //   //     .catch((err) => {
  //   //       alert.error(apiErrorHandler(err));
  //   //     });
  //   // handleConfirmModal(d.name, cta);
  // };

  // const handleModal = (props) => {
  //   openModal({
  //     show: true,
  //     config: {
  //       className: "cartPopup",
  //       width: "auto",
  //       height: "auto",
  //       enableResizing: false,
  //       disableDragging: true,
  //       transition: {
  //         tension: 360,
  //         friction: 40,
  //       },
  //     },
  //     closeOnClickOutside: true,
  //     component: EditPostCompany,
  //     closeComponent: () => <div />,
  //     componentProps: {
  //       onCloseBtnClick: closeModal,
  //       scrollbarHeight: 330,
  //       props,
  //     },
  //   });
  // };
  // const handleConfirmModal = (header, cta) => {
  //   openModal({
  //     show: true,
  //     config: {
  //       className: "cartPopup",
  //       width: "auto",
  //       height: "auto",
  //       enableResizing: false,
  //       disableDragging: true,
  //       transition: {
  //         tension: 360,
  //         friction: 40,
  //       },
  //     },
  //     // closeOnClickOutside: true,
  //     component: ConfirmationModal,
  //     closeComponent: () => <div />,
  //     componentProps: {
  //       header: header,
  //       cta: cta,
  //     },
  //   });
  // };

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
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        background: "#009e7f2e",
                      }}
                      src={
                        profile.is_seeker
                          ? d?.job?.creator?.avatar?.url
                          : d?.applicant?.avatar?.url
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
                    ? profile.is_seeker
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
            Header: () => <h5 className="logo-header">Actions</h5>,
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

export default ApplicationsManager;
