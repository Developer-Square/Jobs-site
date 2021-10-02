import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useDispatch } from "contexts/resume/resume.provider";

import SettingsContext from "contexts/settings/settings.provider";
import Artboard from "components/builder/center/Artboard";
import Button from "components/shared/Button";
import LeftSidebar from "components/builder/left/LeftSidebar";
import RightSidebar from "components/builder/right/RightSidebar";

import * as styles from "./builder.module.css";

const ResumeBuilderView = ({ resume, resumeID }) => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const componentRef = React.useRef();
  const { setPrintRef } = React.useContext(SettingsContext);

  const handleLoadDemoData = () => {
    dispatch({ type: "load_demo_data" });
  };
  React.useEffect(() => {
    (async () => {
      if (!resume) {
        navigate.push("/dashboard/resume");
        toast.error(
          "The resume you were looking for does not exist anymore... or maybe it never did?",
        );
        return null;
      }

      if (resume.createdAt === resume.updatedAt) {
        toast.dark(() => (
          <div className="py-2">
            <p className="leading-loose">
              Not sure where to begin? Try loading demo data to see what Our
              Resume Builder has to offer.
            </p>

            <Button className="mt-4" onClick={handleLoadDemoData}>
              {t("builder.actions.loadDemoData.button")}
            </Button>
          </div>
        ));
      }
      setPrintRef(componentRef);
      dispatch({ type: "set_data", payload: resume });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeID, componentRef]);

  return React.useMemo(() => {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <LeftSidebar />
        </div>
        <div className={styles.center}>
          <Artboard />
        </div>
        <div className={styles.right}>
          <RightSidebar />
        </div>
      </div>
    );
  }, []);
};

export default ResumeBuilderView;
