import { useTranslation } from "react-i18next";
import React from "react";
// import { findIndex } from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { hasAddress, hexToRgb, reduceSectionArray } from "utils";
import AwardsA from "./blocks/Awards/AwardsA";
import CertificationsA from "./blocks/Certifications/CertificationsA";
import ContactB from "./blocks/Contact/ContactB";
import EducationA from "./blocks/Education/EducationA";
import HeadingC from "./blocks/Heading/HeadingC";
import HobbiesA from "./blocks/Hobbies/HobbiesA";
import LanguagesA from "./blocks/Languages/LanguagesA";
import ObjectiveA from "./blocks/Objective/ObjectiveA";
import PageContext from "contexts/page/page.provider";
import ProjectsA from "./blocks/Projects/ProjectsA";
import ReferencesB from "./blocks/References/ReferencesB";
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
  references: ReferencesB,
};

const Gengar = ({ data }) => {
  const { t } = useTranslation();
  const navigation = useHistory();
  const layoutObj = data.resumemetadata.layouts.find(
    ({ name }) => name === "gengar",
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
  //   "gengar",
  // ]);
  // const layout = data.resumemetadata.layouts[layoutIndex].collection;
  const { r, g, b } = hexToRgb(data.resumemetadata.primaryColor) || {};

  const Photo = () =>
    data.owner?.avatar !== "" && (
      <img
        className="w-24 h-24 rounded-full mr-4 object-cover border-4"
        style={{
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
        <>
          <h1 className="text-2xl font-bold leading-tight">
            {data.owner?.firstName}
          </h1>
          <h1 className="text-2xl font-bold leading-tight">
            {data.owner?.lastName}
          </h1>
        </>
      ) : (
        <h1 className="text-2xl font-bold leading-tight">
          {data.owner?.fullName}
        </h1>
      )}

      <div className="text-xs font-medium mt-2">
        {data.owner?.seeker?.title}
      </div>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingC }}>
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
            className="col-span-4 px-6 py-8"
            style={{
              backgroundColor: data.resumemetadata.primaryColor,
              color: data.resumemetadata.backgroundColor,
            }}
          >
            <div className="flex items-center">
              <Photo />
              <Profile />
            </div>

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

            <hr
              className="w-1/4 my-5 opacity-25"
              style={{ borderColor: data.resumemetadata.backgroundColor }}
            />

            <h6 className="font-bold text-xs uppercase tracking-wide mb-2">
              Contact
            </h6>
            <ContactB />
          </div>

          <div
            className="col-span-8 px-6 py-8"
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
          >
            <div className="grid gap-6 items-center">
              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div
            className="col-span-4 px-6 py-8"
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
          >
            <div className="grid gap-6">
              {layout[1] &&
                layout[1].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>

          <div className="col-span-8 px-6 py-8">
            <div className="grid gap-6">
              {layout[2] &&
                layout[2].map((x) => {
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

export default Gengar;
