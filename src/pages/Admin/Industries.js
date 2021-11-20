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

import { ALL_INDUSTRIES } from "graphql/queries";

import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { showNotification } from "helpers";
import moment from "moment";
import ModalContext from "contexts/modal/modal.provider";
import { industriesInnerLimit } from "constants/constants";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedIndustriesQuery = TypedQuery(ALL_INDUSTRIES);

const Industries = () => {
  const { emitter, events } = React.useContext(ModalContext);
  const [checkedId, setCheckedId] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [filename, setFileName] = React.useState("makeSecretKey(10)");
  console.log(filename);
  console.log(checkedId);

  let applications;

  const alert = useAlert();

  const skipResetRef = React.useRef(false);

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [applications]);

  const handleBulkGenerate = () => toast.info(`Feature coming soon!`);

  const handleBulkDelete = () =>
    toast.info(`To Delete ${checkedId.length} items`);

  const handleView = (d) =>
    toast.info(`To View ${d.applicant.fullName} industry`);

  const handleEdit = (d) => emitter.emit(events.INDUSTRY_MODAL, d);

  const openModal = () => emitter.emit(events.INDUSTRY_MODAL);

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
  const variables = {
    first: industriesInnerLimit,
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
                  {d ? (
                    <img
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: 50,
                        background: "#009e7f2e",
                      }}
                      src={d?.backgroundImage?.url || thedbLogo}
                      alt="the-user-logo"
                    />
                  ) : null}
                </p>
              );
            },
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Total Jobs",
            accessor: "vacanciesCount",
          },
          {
            Header: "Last Updated",
            id: "updatedAt",
            accessor: (d) => {
              return <p>{moment(d.updatedAt).format("MMM Do YY")}</p>;
            },
          },
          {
            Header: "Icon",
            id: "icon",
            accessor: (d) => {
              return (
                <p>
                  <i
                    style={{ fontSize: 30 }}
                    className={d?.icon || "fa fa-question-circle"}
                  />
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
        <h2 className="logo-header">
          <Button onClick={openModal} title={"Create New Industry"} />
        </h2>

        <Grid>
          <Table
            columns={columns}
            data={props.data.allIndustries}
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
        <TypedIndustriesQuery variables={variables}>
          {(industriesList) => {
            if (industriesList.loading) {
              return <Loader />;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "Industries Page",
                  title: "Industries Page",
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
                    return tablePage(industriesList);
                  }}
                </TypedUpdateApplicationMutation>
              </MetaWrapper>
            );
          }}
        </TypedIndustriesQuery>
      )}
    </NetworkStatus>
  );
};

export default Industries;
