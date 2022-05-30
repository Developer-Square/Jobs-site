import styled from "styled-components";
import { NavLink as RRNavLink } from "react-router-dom";

export const NotificationIconWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 0 45px;
  cursor: pointer;

  @media only screen and (max-width: 767px) {
    margin: 0 20px;
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    margin: 0 30px;
  }
`;

export const AlertDot = styled.div`
  color: green;
  position: absolute;
  top: -4px;
  right: -2px;
  display: flex;
`;

export const TopbarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 15px 60px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.31);
  position: relative;
  color: #fff;

  @media only screen and (max-width: 767px) {
    padding: 20px;
  }

  @media only screen and (max-width: 1440px) {
    padding: 15px 15px;
  }
`;

export const Logo = styled.div`
  margin-right: auto;

  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;

export const DrawerIcon = styled.div`
  color: black;
`;

export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 36px;
`;

export const TopbarRightSide = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .menu-icon {
    min-width: 14px;
    margin-right: 7px;
  }
  .user-pages-dropdown {
    .popover-handler {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: block;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .popover-content {
      width: 300px;
      .inner-wrap {
        margin: 0px;
      }
    }
  }
`;

export const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  border: 2px solid #ffffff;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  background: #ffffff;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const UserDropdowItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavLink = styled(RRNavLink)`
  font-size: 16px;
  font-weight: 700;
  color: #1849b1;
  line-height: 1.2em;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 16px 20px;
  border-bottom: 1px solid blue;
  transition: 0.15s ease-in-out;
  cursor: pointer;

  span.label {
    color: #fff;
  }

  &:hover {
    color: #8452f1;
  }
`;

export const LogoutBtn = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: #1849b1;
  background-color: transparent;
  line-height: 1.2em;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 16px 20px;
  border: 0;
  outline: 0;
  transition: 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #8452f1;
  }
`;

export const CloseButton = styled.button`
  color: #1849b1;
  background-color: transparent;
  outline: 0;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
`;

export const DrawerWrapper = styled.div`
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;
