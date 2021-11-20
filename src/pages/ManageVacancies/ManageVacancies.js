import React from "react";

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

import {
  GET_MY_VACANCIES,
  JobJobType,
  JobYearsOfExp,
  JobMinQualification,
  JobPayRate,
} from "graphql/queries";

import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { cleanSelectData } from "helpers";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { getDBIdFromGraphqlId } from "core/utils";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedVacanciesQuery = TypedQuery(GET_MY_VACANCIES);
export const TypedJobJobTypeQuery = TypedQuery(JobJobType);
export const TypedJobYearsOfExpQuery = TypedQuery(JobYearsOfExp);
export const TypedJobMinQualificationQuery = TypedQuery(JobMinQualification);
export const TypedJobPayRateQuery = TypedQuery(JobPayRate);

const ManageVacancies = ({ deviceType }) => {
  const history = useHistory();
  const [checkedId, setCheckedId] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  // const [editData, setEditData] = React.useState({});
  const [filename, setFileName] = React.useState("makeSecretKey(10)");
  // const { isOpen, toggleSidebar } = useSidebar();
  console.log(filename);
  console.log(checkedId);
  let myVacancies;
  let jobTypeData = [];
  // let qualificationData = [];
  let payRateData;
  // let yearsData = [];

  const skipResetRef = React.useRef(false);

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [myVacancies]);

  const getVacancyUrl = (d) => {
    return `${window.location.origin}/vacancies/${getDBIdFromGraphqlId(
      d.id,
      "Vacancy",
    )}`;
  };

  const handleEdit = (d) => {
    // toggleSidebar();
    toast.info(`Edit ${d.title}`);
    history.push(
      `/dashboard/vacancies/edit-job/${getDBIdFromGraphqlId(d.id, "Vacancy")}`,
    );
    // setEditData(d);
  };
  const handleBulkGenerate = () => {
    // toast.info(`Generated ${checkedId.length} items on CSV`);
    toast.info(`Feature coming soon`);
  };
  const handleBulkDelete = () => {
    // toast.info(`To Delete ${checkedId.length} items`);
    toast.info(`Feature coming soon`);
  };
  const handleView = (d) => {
    // history.push(`/application/${d.id}/`);
    // history.push(`/vacancies/${getDBIdFromGraphqlId(d.id, "Vacancy")}`);
    if (typeof window !== `undefined`) {
      window && window.open(getVacancyUrl(d));
    }
    toast.info(`Redirecting ...`);
  };

  function onAllCheck(event) {
    if (!event.checked) {
      const idx =
        myVacancies && myVacancies.map((category) => parseInt(category.id));
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
            All Job Listings
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
                      ? myVacancies?.filter((vacancy) =>
                          checkedId.includes(vacancy.id),
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
            Header: "Job Title",
            id: "title",
            accessor: (d) => {
              return (
                <div class="ml-3">
                  <div class="">{d?.title}</div>
                  <div class="text-gray-500">({d?.industry?.name})</div>
                </div>
              );
            },
          },
          {
            Header: "Salary",
            id: "salary",
            accessor: (d) => {
              let payRateType;
              if (payRateData) {
                payRateType = payRateData?.find(
                  ({ value }) => value === d?.payRate,
                );
              }
              return (
                <p className="text-sm text-gray-600  truncate">
                  {d.salary} {payRateType && `/ ${payRateType.label}`}
                </p>
              );
            },
          },
          {
            Header: "Closing Date",
            id: "closingDate",
            accessor: (d) => {
              return <p>{moment(d.createdAt).format("YYYY-MM-DD ")}</p>;
            },
          },
          // {
          //   Header: "Email",
          //   accessor: "applicationEmail",
          // },
          {
            Header: "Positions",
            accessor: "positions",
          },
          {
            Header: "Applications",
            accessor: "numberOfApplications",
          },
          {
            Header: "Type",
            id: "jobType",
            accessor: (d) => {
              let jobType;
              if (jobTypeData) {
                jobType = jobTypeData?.find(
                  ({ value }) => value === d?.jobType,
                );
              }
              return <p>{jobType && jobType.label}</p>;
            },
          },
          // {
          //   Header: "Experience",
          //   id: "yearsOfExp",
          //   accessor: (d) => {
          //     let yearsType;
          //     if (yearsData) {
          //       yearsType = yearsData?.find(
          //         ({ value }) => value === d?.yearsOfExp,
          //       );
          //     }
          //     return <p>{yearsType && yearsType.label}</p>;
          //   },
          // },
          // {
          //   Header: "Qualification",
          //   id: "qualification",
          //   accessor: (d) => {
          //     let qualificationType;
          //     if (qualificationData) {
          //       qualificationType = qualificationData?.find(
          //         ({ value }) => value === d?.minQualification,
          //       );
          //     }
          //     return <p>{qualificationType && qualificationType.label}</p>;
          //   },
          // },
          // {
          //   Header: "Industry",
          //   id: "industry",
          //   accessor: (d) => {
          //     return (
          //       <p className="text-sm text-gray-600  truncate">
          //         {d?.industry?.name}
          //       </p>
          //     );
          //   },
          // },

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
        <h2 className="logo-header">Job Listing</h2>

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
            data={props.data.myVacancies}
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
        <TypedVacanciesQuery>
          {(vacanciesList) => {
            if (vacanciesList.loading) {
              return <Loader />;
            }
            if (vacanciesList.data) {
              myVacancies = vacanciesList.data.myVacancies;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "Vacancies Page",
                  title: "Vacancies Page",
                }}
              >
                <TypedJobJobTypeQuery>
                  {(jobData) => {
                    if (jobData.loading) return <div />;

                    if (jobData.data) {
                      jobTypeData = cleanSelectData(
                        jobData.data.__type.enumValues,
                      );
                    }
                    return (
                      <TypedJobMinQualificationQuery>
                        {(qualificationData) => {
                          if (qualificationData.loading) return <div />;

                          if (qualificationData.data) {
                            qualificationData = cleanSelectData(
                              qualificationData.data.__type.enumValues,
                            );
                          }
                          return (
                            <TypedJobPayRateQuery>
                              {(rateData) => {
                                if (rateData.loading) return <div />;

                                if (rateData.data) {
                                  payRateData = cleanSelectData(
                                    rateData.data.__type.enumValues,
                                  );
                                }
                                return (
                                  <TypedJobYearsOfExpQuery>
                                    {(yearsData) => {
                                      if (yearsData.loading) return <div />;

                                      if (yearsData.data) {
                                        yearsData = cleanSelectData(
                                          yearsData.data.__type.enumValues,
                                        );
                                      }
                                      return tablePage(vacanciesList);
                                    }}
                                  </TypedJobYearsOfExpQuery>
                                );
                              }}
                            </TypedJobPayRateQuery>
                          );
                        }}
                      </TypedJobMinQualificationQuery>
                    );
                  }}
                </TypedJobJobTypeQuery>
              </MetaWrapper>
            );
          }}
        </TypedVacanciesQuery>
      )}
    </NetworkStatus>
  );
};

export default ManageVacancies;
