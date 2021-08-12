import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import * as styles from "./Artboard.module.css";
import { useSelector } from "contexts/resume/resume.provider";
import Castform from "templates/Castform";
import Celebi from "templates/Celebi";
import Gengar from "templates/Gengar";
import Glalie from "templates/Glalie";
import Onyx from "templates/Onyx";
import Pikachu from "templates/Pikachu";
import SettingsContext from "contexts/settings/settings.provider";

const Artboard = () => {
  const state = useSelector();
  const { t } = useTranslation();
  const { id, name, resumemetadata } = state;
  const { template } = resumemetadata;
  const { printRef } = React.useContext(SettingsContext);

  return (
    <>
      <Helmet>
        <title>{`${name} | ${t("shared.appName")}`}</title>
        <link
          rel="canonical"
          href={`${window.location.origin}/dashboard/resume/builder/${id}`}
        />
        {/* <title>
          {name} | {t("shared.appName")}
        </title>
        <link
          rel="canonical"
          href={`https://thedatabase.co.ke/dashboard/resume/builder/${id}`}
          // href={`${window.location.origin}/dashboard/resume/builder/${id}`}
        /> */}
      </Helmet>

      <div id="page" className={styles.container}>
        <div ref={printRef}>
          {template === "onyx" && <Onyx data={state} />}
          {template === "pikachu" && <Pikachu data={state} />}
          {template === "gengar" && <Gengar data={state} />}
          {template === "castform" && <Castform data={state} />}
          {template === "glalie" && <Glalie data={state} />}
          {template === "celebi" && <Celebi data={state} />}
        </div>
      </div>
    </>
  );
};

export default memo(Artboard);
