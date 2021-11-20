import React from "react";
import { useAlert } from "react-alert";
import Table from "components/Table/Table";
import { Grid } from "components/Grid/Grid";
import { ActionButton } from "styles/pages.style";
// import { useSidebar } from "context/sidebar/use-sidebar";
import { toast } from "react-toastify";

import Button from "components/Button/Button";
// import Slide from "containers/Slide/Slide";
// import EditPostCompany from "./EditPostCompany";

import { CSVDownloader } from "react-papaparse";
// import { makeSecretKey } from "utils";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import { BOOKMARKED_JOBS } from "graphql/queries";

import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { showNotification } from "helpers";
import { AuthContext } from "contexts/auth/auth.context";
import moment from "moment";
import { getDBIdFromGraphqlId } from "utils";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedBookmarksQuery = TypedQuery(BOOKMARKED_JOBS);

const Bookmarks = ({ deviceType }) => {
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
  let bookmarks;

  const alert = useAlert();

  const skipResetRef = React.useRef(false);

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [bookmarks]);
  const getVacancyUrl = (d) => {
    if (profile.isSeeker) {
      return `${window.location.origin}/vacancies/${getDBIdFromGraphqlId(
        d?.job?.id,
        "Vacancy",
      )}`;
    }
    if (profile.isEmployer) {
      return `${window.location.origin}/p/${getDBIdFromGraphqlId(
        d?.user?.id,
        "User",
      )}`;
    }
  };

  const handleBulkGenerate = () => {
    toast.info(`to generate ${checkedId.length} items on CSV`);
  };
  const handleBulkDelete = () => {
    toast.info(`To Delete ${checkedId.length} items`);
  };

  const handleView = (d) => {
    // history.push(`/application/${d.id}/`);
    if (typeof window !== `undefined`) {
      window && window.open(getVacancyUrl(d));
    }
    toast.info(`Redirecting ...`);
  };

  function onAllCheck(event) {
    if (!event.checked) {
      const idx =
        bookmarks && bookmarks.map((category) => parseInt(category.id));
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
            Saved Jobs
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
                      ? bookmarks?.filter((application) =>
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
            Header: "Job Title",
            id: "title",
            accessor: (d) => {
              return (
                <p className="text-sm text-gray-600  truncate">{d.job.title}</p>
              );
            },
          },
          {
            Header: "Date Saved",
            id: "createdAt",
            accessor: (d) => {
              return <p>{moment(d.createdAt).format("YYYY-MM-DD ")}</p>;
            },
          },
          {
            Header:
              profile && profile.isSeeker
                ? "Employer"
                : profile.isEmployer
                ? "Saved By"
                : null,
            id: "email",
            accessor: (d) => {
              return (
                <p>
                  {profile && d
                    ? profile.isSeeker
                      ? d?.job?.creator?.fullName
                      : profile.isEmployer
                      ? d?.user?.email
                      : null
                    : null}
                </p>
              );
            },
          },
          {
            Header: "Closing Date",
            id: "closingDate",
            accessor: (d) => {
              return <p>{moment(d.closingDate).format("YYYY-MM-DD ")}</p>;
            },
          },
          {
            Header: "Saved",
            id: "bookmarked",
            accessor: (d) => {
              return (
                <p className={`text-sm text-gray-600  truncate`}>
                  {d?.bookmarked ? "Saved ✔✅" : "Unmarked ✘⛔"}
                </p>
              );
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
                    className="view-btn"
                    onClick={() => handleView(original)}
                  >
                    {/* <Eyes /> */}
                    <i className="fa fa-eye" aria-hidden="true" />
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
            data={props.data.bookmarkedJobs}
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
        <TypedBookmarksQuery>
          {(bookmarksList) => {
            if (bookmarksList.loading) {
              return <Loader />;
            }
            if (bookmarksList.data) {
              bookmarks = bookmarksList.data.bookmarkedJobs;
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
                    return tablePage(bookmarksList);
                  }}
                </TypedUpdateApplicationMutation>
              </MetaWrapper>
            );
          }}
        </TypedBookmarksQuery>
      )}
    </NetworkStatus>
  );
};

export default Bookmarks;
