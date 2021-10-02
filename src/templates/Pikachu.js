import React from "react";
// import { findIndex } from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { reduceSectionArray } from "utils";
import AwardsA from "./blocks/Awards/AwardsA";
import CertificationsA from "./blocks/Certifications/CertificationsA";
import ContactA from "./blocks/Contact/ContactA";
import EducationA from "./blocks/Education/EducationA";
import HeadingB from "./blocks/Heading/HeadingB";
import HobbiesA from "./blocks/Hobbies/HobbiesA";
import LanguagesA from "./blocks/Languages/LanguagesA";
import PageContext from "contexts/page/page.provider";
import ProjectsA from "./blocks/Projects/ProjectsA";
import ReferencesA from "./blocks/References/ReferencesA";
import SkillsA from "./blocks/Skills/SkillsA";
import WorkA from "./blocks/Work/WorkA";

const Blocks = {
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

const Pikachu = ({ data }) => {
  const navigation = useHistory();
  const layoutObj = data.resumemetadata.layouts.find(
    ({ name }) => name === "pikachu",
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
  //   "pikachu",
  // ]);
  // const layout = data.resumemetadata.layouts[layoutIndex].collection;

  return (
    <PageContext.Provider value={{ data, heading: HeadingB }}>
      <div
        id="page"
        className="p-8 rounded"
        style={{
          fontFamily: data.resumemetadata.font,
          color: data.resumemetadata.textColor,
          backgroundColor: data.resumemetadata.backgroundColor,
        }}
      >
        <div className="grid grid-cols-12 gap-8">
          {data.owner?.avatar && (
            <div className="self-center col-span-4">
              <img
                className="w-48 h-48 rounded-full mx-auto object-cover"
                src={
                  data.owner?.avatar?.url ||
                  "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                }
                alt={data.owner?.fullName}
              />
            </div>
          )}

          <div
            className={`${
              data.owner?.avatar !== "" ? "col-span-8" : "col-span-12"
            }`}
          >
            <div
              className="h-48 rounded flex flex-col justify-center"
              style={{
                backgroundColor: data.resumemetadata.primaryColor,
                color: data.resumemetadata.backgroundColor,
              }}
            >
              <div className="flex flex-col justify-center mx-8 my-6">
                <h1 className="text-3xl font-bold leading-tight">
                  {data.owner?.firstName
                    ? `${data.owner?.firstName} ${data.owner?.lastName}`
                    : data.owner?.fullName}
                </h1>
                <div className="text-sm font-medium tracking-wide">
                  {data.owner?.seeker?.title}
                </div>

                {data.objective.descriptionPlaintext && (
                  <div>
                    <hr
                      className="my-5 opacity-25"
                      style={{
                        borderColor: data.resumemetadata.backgroundColor,
                      }}
                    />

                    <ReactMarkdown className="text-sm">
                      {data.objective.descriptionPlaintext}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="grid gap-4">
              <ContactA />

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div className="col-span-8">
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

export default Pikachu;
