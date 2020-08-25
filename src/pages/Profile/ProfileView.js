/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Facebook, Google, GooglePlus, Twitter } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import Error500 from "components/Error/Error500";
import ImageWrapper from "components/Image/Image";
import Loader from "components/Loader/Loader";
import { BASE_URL } from "constants/constants";
import { useStickyDispatch } from "contexts/app/app.provider";
import { AuthContext } from "contexts/auth/auth.context";
import { tokenConfig } from "helpers";
import { useDeviceType } from "helpers/useDeviceType";
import ProfileImage from "image/user.jpg";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Center } from "styles/pages.style";
import {
  About,
  CardWrapper,
  Col12,
  Col4,
  Col6,
  Col8,
  Contact,
  Container,
  Education,
  Experience,
  Footer,
  Header,
  Languages,
  ProfileDetails,
  Row,
  Skills,
  SocialIcons,
} from "pages/common/style";

const ProfileView = ({ profileID }) => {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const userAgent = navigator.userAgent;
  const deviceType = useDeviceType(userAgent);
  const { desktop } = deviceType;
  const match = useRouteMatch();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const userID = profileID ? profileID : match.params.profileID;
  const useDispatch = useStickyDispatch();
  const setView = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  const setEdit = useCallback(() => {
    useDispatch({ type: "EDIT" });
    history.push("/dashboard/profile");
  }, [useDispatch, history]);
  useEffect(() => {
    setView();
    try {
      axios
        .get(`${BASE_URL}/accounts/${userID}`, tokenConfig())
        .then((res) => {
          console.log("res", res.data);
          setAccount(res.data);
          if (res.data.organization === null && res.data.individual !== null) {
            try {
              axios
                .get(
                  `${BASE_URL}/individual/${res.data.individual}`,
                  tokenConfig()
                )
                .then((res) => {
                  console.log("res", res.data);
                  setUser(res.data);
                  setLoading(false);
                })
                .catch((err) => {
                  setError(err);
                  console.log("errors on profile individual", err);
                });
            } catch (error) {
              setError(error);
            }
          } else if (
            res.data.individual === null &&
            res.data.organization !== null
          ) {
            try {
              axios
                .get(
                  `${BASE_URL}/organization/${res.data.organization}`,
                  tokenConfig()
                )
                .then((res) => {
                  console.log("res", res.data);
                  setOrg(res.data);
                  setLoading(false);
                })
                .catch((err) => {
                  setError(err);
                });
            } catch (error) {
              setError(error);
            }
          } else if (res.data.individual && res.data.organization) {
            setMessage(
              "Clash of the profiles. The user has conflicting individual and organization profiles"
            );
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          console.log("errors on profile organization", err);
        });
    } catch (error) {
      setError(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <Error500 err={error} />;
  }
  return (
    <CardWrapper>
      {profileID ? null : (
        <>
          {profile.id === userID ? (
            <h4>
              Profile
              <Button
                onClick={setEdit}
                size="small"
                title={`Edit Your Profile`}
                style={{
                  fontSize: 15,
                  color: "#5918e6",
                  backgroundColor: "#e6c018",
                  float: "right",
                }}
              />
            </h4>
          ) : null}
        </>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          {user && (
            <>
              <Header>
                <Container>
                  <Row>
                    <Col12 style={{ display: `${desktop ? "block" : "flex"}` }}>
                      <ImageWrapper
                        src={user ? user.image : ProfileImage}
                        className="img-responsive img-circle tm-border"
                        alt={account.full_name}
                        style={{
                          borderRadius: "50%",
                          border: "5px solid #fff",
                          boxShadow: "2px 2px #000",
                          display: "inline-block !important",
                          maxWidth: "10%",
                          height: "auto",
                        }}
                      />
                      <hr />
                      <ProfileDetails style={{}}>
                        <h1 className="tm-title bold shadow">
                          Hi, I am {account.full_name}
                        </h1>
                        <h5>{`(Job Status - ${user.status})`}</h5>
                        <h1 className="white bold shadow">{user.title}</h1>
                      </ProfileDetails>
                    </Col12>
                  </Row>
                </Container>
              </Header>
              {/* about and skills Container */}
              <Container>
                <Row>
                  <Col6>
                    <About>
                      <h3 className="accent">{account.full_name} - Profile</h3>
                      <h2>About</h2>
                      <p>{user.about}</p>
                    </About>
                  </Col6>
                  <Col6>
                    <Skills>
                      <h2 className="white">Skills</h2>
                      {user.skill.length > 0 ? (
                        <>
                          {user.skill.map((skill) => (
                            <p>{skill}</p>
                          ))}
                        </>
                      ) : (
                        <p>Skills proficient in Will be added soon</p>
                      )}
                      {/* <strong>PHP MySQL</strong>
                      <span className="pull-right">70%</span>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-primary"
                          role="progressbar"
                          aria-valuenow={70}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "70%" }}
                        />
                      </div> */}
                    </Skills>
                  </Col6>
                </Row>
              </Container>
              {/* education and languages */}
              <Container>
                <Row>
                  <Col8>
                    <Education>
                      <h2 className="white">Education</h2>
                      {user.edu.length > 0 ? (
                        <>
                          {user.edu.map((level) => (
                            <p>{level}</p>
                          ))}
                        </>
                      ) : (
                        <p>Education Will be added soon</p>
                      )}
                      {/* <div className="education-content">
                        <Accent>New Web Design</Accent>
                        <div className="education-school">
                          <h5>School of Media</h5>
                          <span />
                          <h5>2030 January - 2034 December</h5>
                        </div>
                        <p className="education-description">
                          In lacinia leo sed quam feugiat, ac efficitur dui
                          tristique. Ut venenatis, odio quis cursus egestas,
                          nulla sem volutpat diam, ac dapibus nisl ipsum ut
                          ipsum. Nunc tincidunt libero non magna placerat
                          elementum.
                        </p>
                      </div> */}
                    </Education>
                  </Col8>
                  <Col4>
                    <Languages>
                      <h2>Languages</h2>
                      <ul>
                        <li>English</li>
                        <li>Kiswahili</li>
                        <li>Arabic</li>
                      </ul>
                    </Languages>
                  </Col4>
                </Row>
              </Container>
              {/* contact and experience */}
              <Container>
                <Row>
                  <Col4>
                    <Contact>
                      <h2>Contact</h2>
                      <p>
                        <i className="fa fa-map-marker" /> {user.location}
                      </p>
                      <p>
                        <i className="fa fa-phone" /> {user.phone_number}
                      </p>
                      <p>
                        <i className="fa fa-envelope" /> {account.email}
                      </p>
                    </Contact>
                  </Col4>
                  <Col8>
                    <Experience>
                      <h2 className="white">Experiences</h2>
                      {user.work.length > 0 ? (
                        <>
                          {user.work.map((work) => (
                            <p>{work}</p>
                          ))}
                        </>
                      ) : (
                        <p>Work experiences Will be added soon</p>
                      )}
                      {/* <div className="experience-content">
                        <Accent>Website Development</Accent>
                        <h5>New Media Company</h5>
                        <span />
                        <h5>2035 January - 2036 April</h5>
                        <p className="education-description">
                          Cras porta tincidunt sem, in sollicitudin lorem
                          efficitur ut. Lorem ipsum dolor sit amet, consectetuer
                          adipiscing elit, sed diam nonummy nibh euismod
                          tincidunt ut laoreet.
                        </p>
                      </div> */}
                    </Experience>
                  </Col8>
                </Row>
              </Container>
              {/* footer Container */}
              <Footer>
                <Container>
                  <Row>
                    <Col12>
                      <p style={{ color: "#5918e6" }}>
                        Copyright © 2020 {account.full_name}'s Profile
                      </p>
                      <SocialIcons>
                        <li>
                          <a href="/">
                            <Facebook />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <GooglePlus />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <Twitter />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <Google />
                          </a>
                        </li>
                      </SocialIcons>
                    </Col12>
                  </Row>
                </Container>
              </Footer>
            </>
          )}
          {org && (
            <Header>
              <Container>
                <Row>
                  <Col12>
                    <ImageWrapper
                      src={org.logo}
                      className="img-responsive img-circle tm-border"
                      alt={account.full_name}
                      style={{
                        borderRadius: "50%",
                        border: "5px solid #fff",
                        boxShadow: "2px 2px #000",
                        display: "inline-block !important",
                        maxWidth: "10%",
                        height: "auto",
                      }}
                    />
                    <hr />
                    <Container>
                      <Row>
                        <Col8>
                          <Skills>
                            <h3 className="accent">{org.name}</h3>
                            <h2>
                              <Link to={`${org.website}`}>{org.website}</Link>
                            </h2>
                            <h2>{org.address}</h2>
                            <h2>{org.country}</h2>
                            <p>{org.description}</p>
                          </Skills>
                        </Col8>
                      </Row>
                    </Container>
                  </Col12>
                </Row>
              </Container>
            </Header>
          )}
          {user === null && org === null && (
            <Center>
              <div>profile will be updated soon</div>
              <div>{message ? message : null}</div>
            </Center>
          )}
        </>
      )}
    </CardWrapper>
  );
};

export default ProfileView;
