import React from 'react'
import styled from 'styled-components'
import Switch from '@material-ui/core/Switch';

import { TypedEmployerProfileQuery } from './queries';
import Loader from "components/Loader/Loader";
import NoResult from 'components/NoResult/NoResult'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

<<<<<<< HEAD
function EmployerProfileForm({details}) {
    const variables = {
        id: details.id
=======
function EmployerProfileForm() {
    const getId = () => {
        const values = localStorage.getItem('thedb_auth_profile');
        const parsedObj = JSON.parse(values);
        return parsedObj.id
    }

    const variables = {
        id: getId()
>>>>>>> 8535208... feat: Added employer profile and removed unused code
    }
    return (
        <TypedEmployerProfileQuery variables={variables}>
            {(employerProfileData) => {
                if (employerProfileData.loading) {
                    return <Loader />
                }

                if (employerProfileData.data.user === null) {
                    return <NoResult />
                }

                const {user} = employerProfileData.data;
                let edges;
<<<<<<< HEAD
                if (user.employer) {
                    if (user.employer.industries) {
                        edges = user.employer.industries.edges;
                    }    
                }

                return(
=======
                
                if (user.employer) {
                    if (user.employer.industries) {
                        edges = user.employer.industries.edges;
                    }  
                }

                return (
>>>>>>> 8535208... feat: Added employer profile and removed unused code
                    <div className="row">
                        <div className="col-lg-10 col-md-12">
                            <Heading>
                                <PageHeader>Account Profile</PageHeader>
                                <ShareButton>
<<<<<<< HEAD
                                    <span className="iconify" data-icon="el:share-alt"></span>
=======
                                    <span class="iconify" data-icon="el:share-alt"></span>
>>>>>>> 8535208... feat: Added employer profile and removed unused code
                                </ShareButton>
                            </Heading>
                            <PageSubTitle>Your Plan</PageSubTitle>
                            <div className="dashboard-list-box margin-top-0">
                                <ItemsContainer>
                                    <AccountDetails>
                                        <AccountImage src="https://source.unsplash.com/400x400/?office,tech" alt="account"/>
                                        <Info>
                                            <Title>Free Account</Title>
                                            You are on the free plan. You can save your data and search for jobs. Upgrade for PDF downloads & premium features.
                                        </Info>
                                    </AccountDetails>
                                    <UpgradeButton>Upgrade</UpgradeButton>
                                </ItemsContainer>
                            </div>

<<<<<<< HEAD
                            <PageSubTitle>Profile</PageSubTitle>
=======
                            <PageSubTitle>Account Details</PageSubTitle>
>>>>>>> 8535208... feat: Added employer profile and removed unused code
                            <div className="dashboard-list-box margin-top-0">
                                <ItemsContainer type="profile">
                                    <ProfileSkills>
                                        <ProfileImage src={user.employer.logo ? user.employer.logo : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin" />
<<<<<<< HEAD
                                        <Title>{user.username}</Title>
                                        <Info>Frontend Developer</Info>
                                        <Info>Nairobi, Kenya</Info>
=======
                                        <Title special={true}>
                                            {user.username}
                                            <VerifiedStatus>
                                                {user.verified ? (
                                                    <span className="iconify" data-icon="ic:sharp-verified" style={{color: "#2196f3"}}></span>
                                                ): <span>(not verified)</span>}
                                            </VerifiedStatus>
                                        </Title>
                                        <Info>{user.employer.name}</Info>
                                        <Info>{user.defaultAddress ? user.defaultAddress.streetAddress1 : 'Add street address...'}, {user.defaultAddress ? user.defaultAddress.city: 'Add city...'}</Info>
>>>>>>> 8535208... feat: Added employer profile and removed unused code
                                    </ProfileSkills>
                                    <ProfileDetails>
                                        <Details>
                                            <Title type="profile">Email</Title>
<<<<<<< HEAD
                                            <Info>tanjirokamado@gmail.com</Info>
                                        </Details>
                                        <Details>
                                            <Title type="profile">Industry</Title>
                                            <Info>Engineering and Technology</Info>
                                        </Details>
                                        <Details>
                                            <Title type="profile">PayRate</Title>
                                            <Info>Ksh 2500 / hr</Info>
                                        </Details>
                                        <Details>
                                            <Title type="profile">Education Qualification</Title>
                                            <Info>Secondary</Info>
                                        </Details>
=======
                                            {/* //ToDo: Blur this out */}
                                            <Info>{user.email}</Info>
                                        </Details>
                                        <Details>
                                            <Title type="profile">First Name</Title>
                                            <Info>{user.firstName}</Info>
                                        </Details>
                                        <Details>
                                            <Title type="profile">Last Name</Title>
                                            <Info>{user.lastName}</Info>
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
                                            <Info>{user.employer.website}</Info>
                                        </Details>
                                        <Details>
                                            <Title type="profile">Looking For</Title>
                                            <Info>{user.employer.lookingFor}</Info>
                                        </Details>
                                        <Details>
                                            {/* // ToDo: Blur this out */}
                                            <Title type="profile">Phone Number</Title>
                                            <Info>{user.phone}</Info>
                                        </Details>
                                        <Details>
                                            <Title type="profile">Additional Info</Title>
                                        </Details>
                                        <PaddedInfo>{!user.employer.descriptionPlaintext ? 'Add some info...' : user.seeker.descriptionPlaintext}</PaddedInfo>
                                    </ProfileDetails>
                                    <Spacer />
                                    <ProfileDetails>
                                        <Details>
                                            <Title type="profile">Interests</Title>
                                        </Details>
                                        {edges ? 
                                        edges.length ? edges.map(industry => (
                                                <PaddedInfo>{industry.node.name}</PaddedInfo>
                                            )): null:  null}
>>>>>>> 8535208... feat: Added employer profile and removed unused code
                                    </ProfileDetails>
                                </ItemsContainer>
                            </div>

                            <PageSubTitle>Connected Accounts</PageSubTitle>
                            <div className="dashboard-list-box margin-top-0">
                                <ItemsContainer>
                                    {/* Reusing the profile details container */}
                                    <ProfileDetails type="socials">
                                        <Details type="socials">
                                            <Socials>
                                                <span className="iconify" data-icon="bi:github"></span>
                                                <Title type="profile">Github</Title>
                                            </Socials>
<<<<<<< HEAD
                                            <Info>https://github.com/tanjiro</Info>
=======
                                            <Info>https://github.com/{user.username}</Info>
>>>>>>> 8535208... feat: Added employer profile and removed unused code
                                        </Details>
                                        <Details type="socials">
                                            <Socials>
                                                <span class="iconify" data-icon="logos:linkedin-icon"></span>
                                                <Title type="profile">LinkedIn</Title>
                                            </Socials>
                                            <Info type="connect">Connect</Info>
                                        </Details>
                                        <Details type="socials">
                                            <Socials>
                                                <span class="iconify" data-icon="flat-color-icons:google"></span>
                                                <Title type="profile">Google</Title>
                                            </Socials>
<<<<<<< HEAD
                                            <Info>tanjirokamado@gmail.com</Info>
=======
                                            <Info>{user.email}</Info>
>>>>>>> 8535208... feat: Added employer profile and removed unused code
                                        </Details>
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
                                            <Switch {...label} defaultChecked/>
                                        </Details>
                                        <Details type="socials">
                                            <EmailInfo>
                                                <Title type="profile">Resume Analytics</Title>
                                                <Info>Views, downloads and monthly statistics for each resume</Info>
                                            </EmailInfo>
                                            <Switch {...label} defaultChecked/>
                                        </Details>
                                    </ProfileDetails>
                                </ItemsContainer>
                            </div>

                            <PageSubTitle>Danger Zone</PageSubTitle>
                            <div className="dashboard-list-box margin-top-0">
                                <ItemsContainer>
                                    <ProfileDetails type="socials">
                                        <Details type="socials">
                                            <Info>Once you delete your account, it cannot be undone. This is permanent.</Info>
                                            {/* Reusing the upgrade button */}
                                            <UpgradeButton type="delete">Delete Account</UpgradeButton>
                                        </Details>
                                    </ProfileDetails>
                                </ItemsContainer>
                            </div>
                            <Info>Need help? Have questions or feedback? Our team would love to hear from you - <span>contact our support</span></Info>
                        </div>
                    </div>
                );
            }}
<<<<<<< HEAD
        </TypedEmployerProfileQuery>
    )
}

=======
        
        </TypedEmployerProfileQuery>
    )
}
const VerifiedStatus = styled.div`
    padding-left: 5px;
    svg {
        font-size: 22px;
    }

    span {
        font-size: 14px;
    }
`
const Spacer = styled.div`
    margin: 0 15px;
`
const PaddedInfo = styled.div`
    font-size: 15px;
    line-height: 20px;
    color:  rgb(152, 161, 179);
    max-width: 448px;
    padding: 5px;
    background: #eee;
    margin-bottom: 3px;
    border-radius: 3px;
`
>>>>>>> 8535208... feat: Added employer profile and removed unused code
const Heading = styled.div`
    display: flex;
    justify-content: space-between;
`
const PageHeader = styled.div`
    font-size: 26px;
    line-height: 30px;
    margin-left: 40px;
    margin-bottom: 20px;
`
const ShareButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: rgb(33,150,243);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 8px 8px 1px lightblue;

    svg {
        font-size: 23px;
        color: #fff;
    }
`
const PageSubTitle = styled.div`
    font-size: 13.5px;
    letter-spacing: 2.2px;
    line-height: 20px;
    margin-left: 40px;
    margin-bottom: 8px;
    color: rgb(152, 161, 179);
    text-transform: uppercase;
`
const ItemsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 24px 40px;
    border-radius: 6px;
    align-items: center;
    margin-bottom: 28px;
`
const AccountDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Title = styled.div`
<<<<<<< HEAD
    font-size: ${props => props.type === 'profile' ? '17px' : '18px'};
=======
    display: ${props => props.special ? 'flex' : ''};
    font-size: ${props => props.type === 'profile' ? '18px' : '19px'};
>>>>>>> 8535208... feat: Added employer profile and removed unused code
    line-height: 24px;
    color: #262b33;
    font-weight: 400;
    margin-bottom: 6px;
    margin-right: ${props => props.type === 'profile' ? '40px' : '0'};
`
const AccountImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 14px;
    flex-shrink: 0;
    background-position: center center;
    background-size: 100% 100%;
`
const Info = styled.div`
    font-size: 15px;
    line-height: 20px;
    color: ${props => props.type === 'connect' ? 'rgb(33, 150, 243)' : 'rgb(152, 161, 179)}'};
    cursor: ${props => props.type === 'connect' ? 'pointer' : ''};
    max-width: 448px;
    margin-bottom: 3px;

    span {
        color: rgb(33, 150, 243);
    }
`
const UpgradeButton = styled.div`
<<<<<<< HEAD
    font-size: 17px;
=======
    font-size: 18px;
>>>>>>> 8535208... feat: Added employer profile and removed unused code
    line-height: 24px;
    cursor: pointer;
    color: ${props => props.type === 'delete' ? 'rgb(255, 76, 76)' : 'rgb(33, 150, 243)'};
`
const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.type === 'socials' ? '100%': '400px'};
`
const Details = styled.div`
    display: flex;
    justify-content: ${props => props.type === 'socials' ? 'space-between': 'auto'};
    margin-bottom: 13px;
    border-bottom: ${props => props.type === 'socials' ? 'none': '1px solid #ccc'};
`
const ProfileSkills = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ProfileImage = styled.img`
    width: 75px;
    border-radius: 50%;
    margin-bottom: 10px;
`
const Socials = styled.div`
    display: flex;

    svg {
        margin-top: 1px;
        margin-right: 10px;
        font-size: 20px;
    }
`
const EmailInfo = styled.div`
    display: flex;
    flex-direction: column;
`
export default EmployerProfileForm;
