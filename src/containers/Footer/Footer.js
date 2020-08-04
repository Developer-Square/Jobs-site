import React from "react";
import Footer from "../../components/Footer";
import Icon from "../../components/Icons";

export default function FooterContainer() {
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>About Us</Footer.Title>
            <Footer.Link>Reviews</Footer.Link>
            <Footer.Link>Clients</Footer.Link>
            <Footer.Link>Testimonials</Footer.Link>
            <Footer.Link>Jobs</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Services</Footer.Title>
            <Footer.Link>Marketing</Footer.Link>
            <Footer.Link>Consulting</Footer.Link>
            <Footer.Link>Development</Footer.Link>
            <Footer.Link>Design</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Contact Us</Footer.Title>
            <Footer.Link>Nairobi</Footer.Link>
            <Footer.Link>Kisumu</Footer.Link>
            <Footer.Link>Nakuru</Footer.Link>
            <Footer.Link>Mombasa</Footer.Link>
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
