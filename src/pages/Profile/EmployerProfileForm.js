import React from "react";
import styled from "styled-components";
import DraftRenderer from "components/DraftRenderer/DraftRenderer";
import ConstantsContext from "contexts/constants/constants.provider";

function EmployerProfileForm({ details }) {
  const { workForce } = React.useContext(ConstantsContext);

  return (
    <div className="grid grid-cols-4 gap-4 p-5">
      <div className="bg-white shadow-lg rounded-lg col-span-1">
        <div className="py-3">
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={
                details.employer?.logo?.url ||
                "https://bootdey.com/img/Content/avatar/avatar7.png"
              }
              alt={details.employer?.logo?.alt || "Admin"}
            />
          </div>
          <div className="p-2">
            <h3 className=" text-lg font-bold text-center text-gray-900 font-medium leading-8">
              {details.employer.name}
            </h3>

            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Contact Info</span>
              </li>
              <li className="flex items-center py-3">
                <span>
                  <i className="fa fa-phone" />
                </span>
                <span className="ml-auto">{details?.phone}</span>
              </li>
              <li className="flex items-center py-3">
                <span>
                  <i className="fa fa-map-marker" />
                </span>
                <span className="ml-auto">{details?.employer?.location}</span>
              </li>
              <li className="flex items-center py-3">
                <span>
                  <i className="fa fa-link" />
                </span>
                <span className="ml-auto">{details?.employer?.website}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg col-span-2">
        <div className="p-3 text-gray-900">
          <div className="mb-auto mt-auto max-w-lg">
            <h1 className="text-3xl uppercase">About</h1>
            <p>
              {details?.employer?.description ? (
                <DraftRenderer
                  content={JSON.parse(details?.employer?.description)}
                />
              ) : (
                "Company Information Not found ..."
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white shadow-lg rounded-lg p-3">
          <div className="font-medium text-lg text-gray-800">Social Links</div>
          {details?.socials?.length > 0
            ? details?.socials?.map((social) => {
                return (
                  <Details key={social.id} type="socials">
                    <Socials>
                      <span
                        className="iconify"
                        data-icon={`bi:${social.network?.toLowerCase()}`}
                      ></span>
                      <Title type="profile">{social.network}</Title>
                    </Socials>
                    <Info>{social.username}</Info>
                  </Details>
                );
              })
            : "No socials added"}
        </div>
        <div className="mt-2 bg-white shadow-lg rounded-lg p-3">
          <div className="font-medium text-lg text-gray-800">Industries</div>
          <div className="text-gray-500 mb-3 whitespace-nowrap">
            {details.employer?.industries.map((industry, i) => (
              <PaddedInfo key={i}>{industry.name}</PaddedInfo>
            ))}
          </div>
          <div className="font-medium text-lg text-gray-800">Company Size</div>
          <div className="text-gray-500 mb-3 whitespace-nowrap">
            {
              workForce.find((a) => a.value === details?.employer?.workForce)
                .label
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const PaddedInfo = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: rgb(152, 161, 179);
  max-width: 448px;
  padding: 5px;
  background: #eee;
  margin-bottom: 3px;
  border-radius: 3px;
`;

const Title = styled.div`
  display: ${(props) => (props.special ? "flex" : "")};
  font-size: ${(props) => (props.type === "profile" ? "18px" : "19px")};
  line-height: 24px;
  color: #262b33;
  font-weight: 400;
  margin-bottom: 6px;
  margin-right: ${(props) => (props.type === "profile" ? "40px" : "0")};
`;

const Info = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: ${(props) =>
    props.type === "connect" ? "rgb(33, 150, 243)" : "rgb(152, 161, 179)}"};
  cursor: ${(props) => (props.type === "connect" ? "pointer" : "")};
  max-width: 448px;
  margin-bottom: 3px;

  span {
    color: rgb(33, 150, 243);
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.type === "socials" ? "space-between" : "auto"};
  margin-bottom: 13px;
  border-bottom: ${(props) =>
    props.type === "socials" ? "none" : "1px solid #ccc"};
`;

const Socials = styled.div`
  display: flex;

  svg {
    margin-top: 1px;
    margin-right: 10px;
    font-size: 20px;
  }
`;

export default EmployerProfileForm;
