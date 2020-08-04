import React from "react";
import Footer from "../../components/Footer";
import Icon from "../../components/Icons";

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
              <Icon className="fab fa-facebook-f" />
              Facebook
            </Footer.Link>
            <Footer.Link href="#">
              <Icon className="fab fa-instagram" />
              Instagram
            </Footer.Link>
            <Footer.Link href="#">
              <Icon className="fab fa-youtube" />
              Youtube
            </Footer.Link>
            <Footer.Link href="#">
              <Icon className="fab fa-twitter" />
              Twitter
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  );
}
