import React from "react";
import Footer from "components/Footer/Footer";
import { Facebook, Twitter, YouTube, Instagram } from "components/AllSvgIcon";

export default function FooterContainer() {
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>We Care</Footer.Title>
            <Footer.Link>Privacy Policy</Footer.Link>
            <Footer.Link>Terms of Service</Footer.Link>
            <Footer.Link>FAQs</Footer.Link>
            <Footer.Link>Help</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Contact Us</Footer.Title>
            <Footer.Link>hello@thedatabase.co.ke</Footer.Link>
            <Footer.Link>+254795945366</Footer.Link>
            <Footer.Link>+254718582207</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Social</Footer.Title>
            <Footer.Link href="#">
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
            <Footer.Link href="#">
              <Twitter />
              Twitter
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  );
}
