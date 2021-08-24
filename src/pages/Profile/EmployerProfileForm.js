import React from "react";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

function EmployerProfileForm({ details }) {
  return (
    <div className="row">
      <div className="col-lg-10 col-md-12">
        <Heading>
          <PageHeader>Account Profile</PageHeader>
          <ShareButton>
            <span class="iconify" data-icon="el:share-alt"></span>
          </ShareButton>
        </Heading>
        <PageSubTitle>Your Plan</PageSubTitle>
        <div className="dashboard-list-box margin-top-0">
          <ItemsContainer>
            <AccountDetails>
              <AccountImage
                src="https://source.unsplash.com/400x400/?office,tech"
                alt="account"
              />
              <Info>
                <Title>Free Account</Title>
                You are on the free plan. You can save your data and search for
                jobs. Upgrade for PDF downloads & premium features.
              </Info>
            </AccountDetails>
            <UpgradeButton>Upgrade</UpgradeButton>
          </ItemsContainer>
        </div>

        <PageSubTitle>Account Details</PageSubTitle>
        <div className="dashboard-list-box margin-top-0">
          <ItemsContainer type="profile">
            <ProfileSkills>
              <ProfileImage
                src={
                  details.employer?.log?.url ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png"
                }
                alt={details.employer?.log?.alt || "Admin"}
              />
              <Title special={true}>
                {details.username}
                <VerifiedStatus>
                  {details.verified ? (
                    <span
                      className="iconify"
                      data-icon="ic:sharp-verified"
                      style={{ color: "#2196f3" }}
                    ></span>
                  ) : (
                    <span>(not verified)</span>
                  )}
                </VerifiedStatus>
              </Title>
              <Info>{details.employer.name}</Info>
              <Info>
                {details.defaultAddress
                  ? details.defaultAddress.streetAddress1
                  : "Add street address..."}
                ,{" "}
                {details.defaultAddress
                  ? details.defaultAddress.city
                  : "Add city..."}
              </Info>
            </ProfileSkills>
            <ProfileDetails>
              <Details>
                <Title type="profile">Email</Title>
                {/* //ToDo: Blur this out */}
                <Info>{details.email}</Info>
              </Details>
              <Details>
                <Title type="profile">First Name</Title>
                <Info>{details.firstName}</Info>
              </Details>
              <Details>
                <Title type="profile">Last Name</Title>
                <Info>{details.lastName}</Info>
              </Details>
            </ProfileDetails>
          </ItemsContainer>
        </div>

        <PageSubTitle>Employer Details</PageSubTitle>
        <div className="dashboard-list-box margin-top-0">
          <ItemsContainer type="profile">
            <ProfileDetails>
              <Details>
                {/* // ToDo: Blur this out */}
                <Title type="profile">Website Url</Title>
                <Info>{details.employer.website}</Info>
              </Details>
              <Details>
                <Title type="profile">Looking For</Title>
                <Info>{details.employer.lookingFor}</Info>
              </Details>
              <Details>
                {/* // ToDo: Blur this out */}
                <Title type="profile">Phone Number</Title>
                <Info>{details.phone}</Info>
              </Details>
              <Details>
                <Title type="profile">Additional Info</Title>
              </Details>
              <PaddedInfo>
                {!details.employer.descriptionPlaintext
                  ? "Add some info..."
                  : details.employer.descriptionPlaintext}
              </PaddedInfo>
            </ProfileDetails>
            <Spacer />
            <ProfileDetails>
              <Details>
                <Title type="profile">Interests</Title>
              </Details>
              {details.employer?.industries.map((industry, i) => (
                <PaddedInfo key={i}>{industry.name}</PaddedInfo>
              ))}
            </ProfileDetails>
          </ItemsContainer>
        </div>

        <PageSubTitle>Connected Accounts</PageSubTitle>
        <div className="dashboard-list-box margin-top-0">
          <ItemsContainer>
            {/* Reusing the profile details container */}
            <ProfileDetails type="socials">
              {details?.socials?.map((social) => {
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
              })}
            </ProfileDetails>
          </ItemsContainer>
        </div>

        <PageSubTitle>Email Notifications</PageSubTitle>
        <div className="dashboard-list-box margin-top-0">
          <ItemsContainer>
            {/* Reusing the profile details container */}
            <ProfileDetails type="socials">
              <Details type="socials">
                <EmailInfo>
                  <Title type="profile">Updates and Offers</Title>
                  <Info>Discounts, special offers, new features and more</Info>
                </EmailInfo>
                <Switch {...label} defaultChecked />
              </Details>
              <Details type="socials">
                <EmailInfo>
                  <Title type="profile">Resume Analytics</Title>
                  <Info>
                    Views, downloads and monthly statistics for each resume
                  </Info>
                </EmailInfo>
                <Switch {...label} defaultChecked />
              </Details>
            </ProfileDetails>
          </ItemsContainer>
        </div>

        <PageSubTitle>Danger Zone</PageSubTitle>
        <div className="dashboard-list-box margin-top-0">
          <ItemsContainer>
            <ProfileDetails type="socials">
              <Details type="socials">
                <Info>
                  Once you delete your account, it cannot be undone. This is
                  permanent.
                </Info>
                {/* Reusing the upgrade button */}
                <UpgradeButton type="delete">Delete Account</UpgradeButton>
              </Details>
            </ProfileDetails>
          </ItemsContainer>
        </div>
        <Info>
          Need help? Have questions or feedback? Our team would love to hear
          from you - <span>contact our support</span>
        </Info>
      </div>
    </div>
  );
}
const VerifiedStatus = styled.div`
  padding-left: 5px;
  svg {
    font-size: 22px;
  }

  span {
    font-size: 14px;
  }
`;
const Spacer = styled.div`
  margin: 0 15px;
`;
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
const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PageHeader = styled.div`
  font-size: 26px;
  line-height: 30px;
  margin-left: 40px;
  margin-bottom: 20px;
`;
const ShareButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: rgb(33, 150, 243);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 8px 8px 1px lightblue;

  svg {
    font-size: 23px;
    color: #fff;
  }
`;
const PageSubTitle = styled.div`
  font-size: 13.5px;
  letter-spacing: 2.2px;
  line-height: 20px;
  margin-left: 40px;
  margin-bottom: 8px;
  color: rgb(152, 161, 179);
  text-transform: uppercase;
`;
const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 24px 40px;
  border-radius: 6px;
  align-items: center;
  margin-bottom: 28px;
`;
const AccountDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
const AccountImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 14px;
  flex-shrink: 0;
  background-position: center center;
  background-size: 100% 100%;
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
const UpgradeButton = styled.div`
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
  color: ${(props) =>
    props.type === "delete" ? "rgb(255, 76, 76)" : "rgb(33, 150, 243)"};
`;
const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.type === "socials" ? "100%" : "400px")};
`;
const Details = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.type === "socials" ? "space-between" : "auto"};
  margin-bottom: 13px;
  border-bottom: ${(props) =>
    props.type === "socials" ? "none" : "1px solid #ccc"};
`;
const ProfileSkills = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 75px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const Socials = styled.div`
  display: flex;

  svg {
    margin-top: 1px;
    margin-right: 10px;
    font-size: 20px;
  }
`;
const EmailInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export default EmployerProfileForm;
