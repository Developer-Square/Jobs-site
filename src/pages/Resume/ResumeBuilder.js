import { toast } from "react-toastify";
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import * as styles from "./builder.module.css";
import { useDispatch } from "contexts/resume/resume.provider";
import Artboard from "components/builder/center/Artboard";
import Button from "components/shared/Button";
import DatabaseContext from "contexts/database/database.provider";
import LeftSidebar from "components/builder/left/LeftSidebar";
import LoadingScreen from "components/LoadingScreen";
import RightSidebar from "components/builder/right/RightSidebar";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResumeBuilder = ({ id }) => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { getResume } = useContext(DatabaseContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLoadDemoData = () => {
    dispatch({ type: "load_demo_data" });
  };

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      const resume = await getResume(id);

      if (!resume) {
        // navigate.push("/dashboard");
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

      dispatch({ type: "set_data", payload: resume });
      return setLoading(false);
    })();
  }, [dispatch, getResume, handleLoadDemoData, id, navigate, t]);

  return useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }

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
  }, [loading]);
};

export default memo(ResumeBuilder);
