import { useTranslation } from "react-i18next";
import React from "react";
// import { findIndex } from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { hexToRgb, reduceSectionArray } from "utils";
import AwardsA from "./blocks/Awards/AwardsA";
import CertificationsA from "./blocks/Certifications/CertificationsA";
import ContactC from "./blocks/Contact/ContactC";
import EducationA from "./blocks/Education/EducationA";
import HeadingE from "./blocks/Heading/HeadingE";
import HobbiesA from "./blocks/Hobbies/HobbiesA";
import LanguagesB from "./blocks/Languages/LanguagesB";
import ObjectiveA from "./blocks/Objective/ObjectiveA";
import PageContext from "contexts/page/page.provider";
import ProjectsA from "./blocks/Projects/ProjectsA";
import ReferencesA from "./blocks/References/ReferencesA";
import SkillsA from "./blocks/Skills/SkillsA";
import WorkA from "./blocks/Work/WorkA";

const Blocks = {
  objective: ObjectiveA,
  work: WorkA,
  education: EducationA,
  projects: ProjectsA,
  awards: AwardsA,
  certifications: CertificationsA,
  skills: SkillsA,
  hobbies: HobbiesA,
  languages: LanguagesB,
  references: ReferencesA,
};

const Celebi = ({ data }) => {
  const navigation = useHistory();
  const layoutObj = data.resumemetadata.layouts.find(
    ({ name }) => name === "celebi",
  );
  if (!layoutObj) {
    navigation.push("/");
    toast(
      "The requested Resume is not Ready. Kindly ask the owner to complete it",
    );
  }
  const layout = reduceSectionArray(layoutObj.collection);
  // const layoutIndex = findIndex(data.resumemetadata.layouts, [
  //   "name",
  //   "celebi",
  // ]);
  // const layout = data.resumemetadata.layouts[layoutIndex].collection;

  const { r, g, b } = hexToRgb(data.resumemetadata.primaryColor) || {};
  const { t } = useTranslation();

  const styles = {
    header: {
      position: "absolute",
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: data.resumemetadata.backgroundColor,
      backgroundColor: data.resumemetadata.textColor,
      height: "160px",
      paddingLeft: "275px",
    },
    leftSection: {
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
    },
    rightSection: {
      marginTop: "160px",
    },
  };

  const Photo = () =>
    data.owner?.avatar !== "" && (
      <div className="relative z-40">
        <img
          className="w-full object-cover object-center"
          src={
            data.owner?.avatar?.url ||
            "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          }
          alt={data.owner?.fullName}
          style={{
            height: "160px",
          }}
        />
      </div>
    );

  const Profile = () => (
    <div style={styles.header}>
      <h1
        className="tracking-wide uppercase font-bold"
        style={{ fontSize: "2.75em" }}
      >
        {data.owner?.firstName
          ? `${data.owner?.firstName} ${data.owner?.lastName}`
          : data.owner?.fullName}
      </h1>
      <h6 className="text-lg tracking-wider uppercase">
        {data.owner?.seeker?.title}
      </h6>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingE }}>
      <div
        id="page"
        className="relative rounded"
        style={{
          fontFamily: data.resumemetadata.font,
          color: data.resumemetadata.textColor,
          backgroundColor: data.resumemetadata.backgroundColor,
        }}
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 ml-8" style={styles.leftSection}>
            <Photo />

            <div className="text-center grid gap-4 mt-4 mb-8 mx-6">
              <div>
                <HeadingE>{t("builder.sections.profile")}</HeadingE>
                <div className="relative w-full grid gap-4 text-xs">
                  <ContactC />
                </div>
              </div>

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
          <div className="col-span-8">
            <Profile />

            <div className="relative" style={styles.rightSection}>
              <div className="grid gap-4 mt-4 mb-8 mr-8">
                {layout[1] &&
                  layout[1].map((x) => {
                    const Component = Blocks[x];
                    return Component && <Component key={x} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Celebi;
