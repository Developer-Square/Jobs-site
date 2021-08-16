import { TypedQuery } from "core/queries";
import React from "react";
import NetworkStatus from "components/NetworkStatus";
import { MetaWrapper } from "components/Meta";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import { RECENT_ACTIVITIES_QUERY } from "graphql/queries";
import { Link } from "react-router-dom";
import Loader from "components/Loader/Loader";
import NoResultFound from "components/NoResult/NoResult";
import { vacancyLimit } from "constants/constants";

const TypedRecentActivitiesQuery = TypedQuery(RECENT_ACTIVITIES_QUERY);

const Activities = () => {
  const getLink = (type, type_id) => {
    switch (type) {
      case "Resume":
        return `/r/${type_id}`;
      case "Job":
        return `/vacancies/${type_id}`;
      case "Application":
        return `/dashboard/applications/${type_id}`;

      default:
        break;
    }
  };
  const variables = {
    first: vacancyLimit,
  };
  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedRecentActivitiesQuery variables={variables}>
          {(activitiesList) => {
            if (activitiesList.loading) {
              return <Loader />;
            }
            if (
              activitiesList.data &&
              activitiesList.data.recentActivities === null
            ) {
              return <NoResultFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            console.log(activitiesList);
            return (
              <MetaWrapper
                meta={{
                  description:
                    "Jobs in Kenya | The Database Kenya | Jobs need people",
                  title: "Dashboard",
                }}
              >
                <ul>
                  {activitiesList.data.recentActivities.edges.map((edge, i) => {
                    return (
                      <li key={i}>
                        <strong>
                          <Link
                            to={`${getLink(
                              edge.node.modelName,
                              edge.node.modelId,
                            )}`}
                          >
                            {edge.node.descriptionPlaintext} !
                          </Link>
                        </strong>
                        <Link to="#" className="close-list-item">
                          <i className="fa fa-close" />
                        </Link>
                      </li>
                    );
                  })}

                  {/* <li>
                    Your job listing{" "}
                    <strong>
                      <Link to="#">
                        Core PHP Developer for Site Maintenance
                      </Link>
                    </strong>{" "}
                    is expiring!
                    <Link to="#" className="close-list-item">
                      <i className="fa fa-close" />
                    </Link>
                  </li> */}
                </ul>
              </MetaWrapper>
            );
          }}
        </TypedRecentActivitiesQuery>
      )}
    </NetworkStatus>
  );
};

export default Activities;
