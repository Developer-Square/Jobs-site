import { MetaWrapper } from "components/Meta";
import NetworkStatus from "components/NetworkStatus";
import { withApollo } from "helpers/apollo";
import React from "react";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";
import Loader from "components/Loader/Loader";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import NoResultFound from "components/NoResult/NoResult";

const View = () => {
  const variables = {
    first: 10,
  };

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedHomePageQuery variables={variables} errorPolicy="all" loaderFull>
          {(userData) => {
            if (userData.loading) {
              return <Loader />;
            }

            if (userData.data && userData.data.users === null) {
              return <NoResultFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "categoryData.data.category.seoDescription",
                  title: "categoryData.data.category.seoTitle",
                  type: "product.category",
                }}
              >
                <Page
                  data={userData.data.users.edges.map((edge) => edge.node)}
                />
              </MetaWrapper>
            );
          }}
        </TypedHomePageQuery>
      )}
    </NetworkStatus>
  );
};

export default withApollo(View);
