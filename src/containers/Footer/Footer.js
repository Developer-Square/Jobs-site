import React from "react";
import Footer from "components/Footer/Footer";
import { Facebook, Twitter, YouTube, Instagram } from "components/AllSvgIcon";
import { TOS, HELP_PAGE } from "constants/routes.constants";
import { SDG } from "constants/routes.constants";

export default function FooterContainer() {
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>We Care</Footer.Title>
            <Footer.Link href={`${TOS}`}>Privacy Policy</Footer.Link>
            <Footer.Link href={`${TOS}`}>Terms of Service</Footer.Link>
            <Footer.Link href={`${HELP_PAGE}`}>FAQs</Footer.Link>
            <Footer.Link href={`${HELP_PAGE}`}>Help</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>About</Footer.Title>
            {/* <Footer.Link href={`${ABOUT}`}>Who are we?</Footer.Link> */}
            <Footer.Link href={`${SDG}`}>Our SDGs</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Contact Us</Footer.Title>
            <Footer.Link>hello@thedatabase.co.ke</Footer.Link>
            <Footer.Link>+254795945366</Footer.Link>
            <Footer.Link>+254718582207</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Social</Footer.Title>
            <Footer.Link href="https://facebook.com/thedatabase.co.ke">
              <Facebook />
              Facebook
            </Footer.Link>
            <Footer.Link href="https://www.instagram.com/thedatabase.co.ke/">
              <Instagram />
              Instagram
            </Footer.Link>
            <Footer.Link href="#">
              <YouTube />
              Youtube
            </Footer.Link>
            <Footer.Link href="https://twitter.com/ThedatabaseKe">
              <Twitter />
              Twitter
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  );
}
