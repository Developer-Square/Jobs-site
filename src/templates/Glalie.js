import React from "react";
// import { findIndex } from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { hexToRgb, reduceSectionArray } from "utils";
import AwardsA from "./blocks/Awards/AwardsA";
import CertificationsA from "./blocks/Certifications/CertificationsA";
import ContactD from "./blocks/Contact/ContactD";
import EducationA from "./blocks/Education/EducationA";
import HeadingB from "./blocks/Heading/HeadingB";
import HobbiesA from "./blocks/Hobbies/HobbiesA";
import LanguagesA from "./blocks/Languages/LanguagesA";
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
  languages: LanguagesA,
  references: ReferencesA,
};

const Glalie = ({ data }) => {
  const navigation = useHistory();
  const layoutObj = data.resumemetadata.layouts.find(
    ({ name }) => name === "glalie",
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
  //   "glalie",
  // ]);
  // const layout = data.resumemetadata.layouts[layoutIndex].collection;
  const { r, g, b } = hexToRgb(data.resumemetadata.primaryColor) || {};

  const Profile = () => (
    <div className="grid gap-2 text-center">
      {data.owner?.avatar !== "" && (
        <img
          className="w-40 h-40 rounded-full mx-auto"
          src={
            data.owner?.avatar?.url ||
            "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          }
          alt={data.owner?.fullName}
        />
      )}
      <div className="text-4xl font-bold leading-none">
        {data.owner?.firstName ? (
          <>
            <h1>{data.owner?.firstName}</h1>
            <h1>{data.owner?.lastName}</h1>
          </>
        ) : (
          <h1>{data.owner?.fullName}</h1>
        )}
      </div>
      <div className="tracking-wide text-xs uppercase font-medium">
        {data.owner?.seeker?.title}
      </div>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingB }}>
      <div
        id="page"
        className="rounded"
        style={{
          fontFamily: data.resumemetadata.font,
          color: data.resumemetadata.textColor,
          backgroundColor: data.resumemetadata.backgroundColor,
        }}
      >
        <div className="grid grid-cols-12">
          <div
            className="col-span-4"
            style={{
              backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
            }}
          >
            <div className="grid gap-6 text-center p-8">
              <Profile />
              <ContactD />

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div className="col-span-8">
            <div className="grid gap-4 p-8">
              {layout[1] &&
                layout[1].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Glalie;
