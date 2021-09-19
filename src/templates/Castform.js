import React from "react";
// import { findIndex } from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { reduceSectionArray } from "utils";
import AwardsA from "./blocks/Awards/AwardsA";
import CertificationsA from "./blocks/Certifications/CertificationsA";
import ContactC from "./blocks/Contact/ContactC";
import EducationA from "./blocks/Education/EducationA";
import HeadingD from "./blocks/Heading/HeadingD";
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

const Castform = ({ data }) => {
  const navigation = useHistory();
  const layoutObj = data.resumemetadata.layouts.find(
    ({ name }) => name === "castform",
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
  //   "castform",
  // ]);
  // const layout = data.resumemetadata.layouts[layoutIndex].collection;

  const Photo = () =>
    data.owner?.avatar !== "" && (
      <img
        className="w-32 h-32 rounded-full"
        style={{
          borderWidth: 6,
          borderColor: data.resumemetadata.backgroundColor,
        }}
        src={
          data.owner?.avatar?.url ||
          "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        }
        alt={data.owner?.fullName}
      />
    );

  const Profile = () => (
    <div>
      {data.owner?.firstName ? (
        <h1 className="text-2xl font-bold">
          {data.owner?.firstName} {data.owner?.lastName}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold">{data.owner?.fullName}</h1>
      )}
      <h5>{data.owner?.seeker?.title}</h5>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingD }}>
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
            className="col-span-4 py-8 pr-8 pl-5"
            style={{
              color: data.resumemetadata.backgroundColor,
              backgroundColor: data.resumemetadata.primaryColor,
            }}
          >
            <div className="grid gap-4">
              <Photo />
              <Profile />

              <div>
                <HeadingD>Profile</HeadingD>
                <ContactC />
              </div>

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
          <div className="col-span-8 py-8 pr-8 pl-5">
            <div className="grid gap-4">
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

export default Castform;
