import React, { memo, useMemo } from "react";

import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import OfflinePlaceholder from "components/OfflinePlaceholder";
import NoResultFound from "components/NoResult/NoResult";
import { MetaWrapper } from "components/Meta";
import NetworkStatus from "components/NetworkStatus";
import { TypedQuery } from "core/queries";
import Castform from "templates/Castform";
import Celebi from "templates/Celebi";
import Gengar from "templates/Gengar";
import Glalie from "templates/Glalie";
import LoadingScreen from "components/LoadingScreen";
import Onyx from "templates/Onyx";
import Pikachu from "templates/Pikachu";
import fontSizeOptions from "data/fontSizeOptions";
import { FETCH_RESUME } from "graphql/queries";

import { scaler } from "utils";

import * as styles from "./view.module.css";
import BlankResumeTemplate from "./BlankResumeTemplate";

export const TypedResumeQuery = TypedQuery(FETCH_RESUME);

const ResumeViewer = ({ id, ref = null }) => {
  const match = useRouteMatch();
  const { t, i18n } = useTranslation();
  const navigate = useHistory();
  const [resumeID, setResumeID] = React.useState(match.params.resumeID);

  React.useEffect(() => {
    if (match.params.resumeID) {
      setResumeID(match.params.resumeID);
    } else {
      setResumeID(id);
    }
  }, [match.params.resumeID, id]);

  return useMemo(() => {
    return (
      <NetworkStatus>
        {(isOnline) => (
          <TypedResumeQuery
            variables={{
              id: resumeID,
            }}
            errorPolicy="all"
            loaderFull
          >
            {(resumeData) => {
              if (resumeData.loading) {
                return <LoadingScreen />;
              }

              if (resumeData.data && resumeData.data.resume === null) {
                toast.info(
                  `The resume you were looking for does not exist anymore... or maybe it never did?`,
                );
                navigate.push("/");
                return <NoResultFound />;
              }

              if (!isOnline) {
                return <OfflinePlaceholder />;
              }

              i18n.changeLanguage(
                resumeData.data.resume?.resumemetadata?.language || "en",
              );

              for (const [key, sizeDefault] of Object.entries(
                fontSizeOptions,
              )) {
                document.documentElement.style.setProperty(
                  key,
                  `${
                    scaler(resumeData.data.resume?.resumemetadata?.fontSize) *
                    sizeDefault
                  }rem` || `9rem`,
                );
              }

              return (
                <MetaWrapper
                  meta={{
                    description: resumeData.data.resume.seoDescription,
                    title:
                      `${resumeData.data.resume.name} | ${t(
                        "shared.appName",
                      )}` || resumeData.data.resume.seoTitle,
                    link: `${window.location.origin}/r/${match.params.resumeID}`,
                    type: "resume CV",
                  }}
                >
                  {!resumeData.data.resume.resumemetadata ? (
                    <BlankResumeTemplate resume={resumeData.data.resume} />
                  ) : (
                    <div
                      className={styles.page}
                      style={{
                        margin: "4rem auto",
                        backgroundColor:
                          resumeData.data.resume.resumemetadata
                            ?.backgroundColor || `#FFFFFF`,
                      }}
                    >
                      {resumeData.data.resume.resumemetadata.template ===
                        "onyx" && (
                        <Onyx ref={ref} data={resumeData.data.resume} />
                      )}
                      {resumeData.data.resume.resumemetadata.template ===
                        "pikachu" && (
                        <Pikachu ref={ref} data={resumeData.data.resume} />
                      )}
                      {resumeData.data.resume.resumemetadata.template ===
                        "gengar" && (
                        <Gengar ref={ref} data={resumeData.data.resume} />
                      )}
                      {resumeData.data.resume.resumemetadata.template ===
                        "castform" && (
                        <Castform ref={ref} data={resumeData.data.resume} />
                      )}
                      {resumeData.data.resume.resumemetadata.template ===
                        "glalie" && (
                        <Glalie ref={ref} data={resumeData.data.resume} />
                      )}
                      {resumeData.data.resume.resumemetadata.template ===
                        "celebi" && (
                        <Celebi ref={ref} data={resumeData.data.resume} />
                      )}
                    </div>
                  )}
                </MetaWrapper>
              );
            }}
          </TypedResumeQuery>
        )}
      </NetworkStatus>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeID]);
};

export default memo(ResumeViewer);
