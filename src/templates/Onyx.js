import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { hasAddress, reduceSectionArray } from "utils";
// import { findIndex } from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import AwardsA from "./blocks/Awards/AwardsA";
import CertificationsA from "./blocks/Certifications/CertificationsA";
import Contact from "./blocks/Contact/ContactA";
import EducationA from "./blocks/Education/EducationA";
import HeadingA from "./blocks/Heading/HeadingA";
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

const Onyx = ({ data }) => {
  const navigation = useHistory();
  const layoutObj = data.resumemetadata.layouts.find(
    ({ name }) => name === "onyx",
  );
  if (!layoutObj) {
    navigation.push("/");
    toast(
      "The requested Resume is not Ready. Kindly ask the owner to complete it",
    );
  }
  const layout = reduceSectionArray(layoutObj.collection);
  // const layoutIndex = findIndex(data.resumemetadata.layouts, ["name", "onyx"]);
  // const layout = data.resumemetadata.layouts[layoutIndex].collection;
  const { t } = useTranslation();
  return (
    <PageContext.Provider value={{ data, heading: HeadingA }}>
      <div
        id="page"
        className="p-8 rounded"
        style={{
          fontFamily: data.resumemetadata.font,
          color: data.resumemetadata.textColor,
          backgroundColor: data.resumemetadata.backgroundColor,
        }}
      >
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3 flex items-center">
            {data.owner?.avatar && (
              <img
                className="rounded object-cover mr-4"
                src={
                  data.owner?.avatar?.url ||
                  "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                }
                alt={data.owner?.fullName}
                style={{ width: "120px", height: "120px" }}
              />
            )}

            <div>
              <h1
                className="font-bold text-4xl"
                style={{ color: data.resumemetadata.primaryColor }}
              >
                {data.owner?.firstName
                  ? `${data.owner?.firstName} ${data.owner?.lastName}`
                  : data.owner?.fullName}
              </h1>
              <h6 className="font-medium text-sm">
                {data.owner?.seeker?.title}
              </h6>

              {hasAddress(data.owner.defaultAddress) && (
                <div className="flex flex-col mt-4 text-xs">
                  <h6 className="font-bold text-xs uppercase tracking-wide mb-1">
                    {t("shared.forms.address")}
                  </h6>
                  <span>{data.owner?.defaultAddress?.streetAddress1}</span>
                  <span>{data.owner?.defaultAddress?.streetAddress2}</span>
                  <span>
                    {data.owner?.defaultAddress?.city}{" "}
                    {data.owner?.defaultAddress?.postalCode}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Contact />
        </div>

        <hr
          className="my-5 opacity-25"
          style={{ borderColor: data.resumemetadata.textColor }}
        />

        <div className="grid gap-4">
          {layout[0] &&
            layout[0].map((x) => {
              const Component = Blocks[x];
              return Component && <Component key={x} />;
            })}

          <div className="grid grid-cols-2 gap-4">
            {layout[1] &&
              layout[1].map((x) => {
                const Component = Blocks[x];
                return Component && <Component key={x} />;
              })}
          </div>

          {layout[2] &&
            layout[2].map((x) => {
              const Component = Blocks[x];
              return Component && <Component key={x} />;
            })}
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default memo(Onyx);
