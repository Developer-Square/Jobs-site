import React from "react";

const Contact = () => {
  return (
    <div>
      {/* Titlebar
================================================== */}
      <div id="titlebar" className="single">
        <div className="container">
          <div className="sixteen columns">
            <h2>Contact</h2>
            <nav id="breadcrumbs">
              <ul>
                <li>You are here:</li>
                <li>
                  <a href>Home</a>
                </li>
                <li>Contact</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Content
================================================== */}
      {/* Container */}
      <div className="container">
        <div className="sixteen columns">
          <h3 className="margin-bottom-20">Our Office</h3>
          {/* Google Maps */}
          <section className="google-map-container">
            <div id="googlemaps" className="google-map google-map-full" />
          </section>
          {/* Google Maps / End */}
        </div>
      </div>
      {/* Container / End */}
      {/* Container */}
      <div className="container">
        <div className="eleven columns">
          <h3 className="margin-bottom-15">Contact Form</h3>
          {/* Contact Form */}
          <section id="contact" className="padding-right">
            {/* Success Message */}
            <mark id="message" />
            {/* Form */}
            <form method="post" name="contactform" id="contactform">
              <fieldset>
                <div>
                  <label>Name:</label>
                  <input name="name" type="text" id="name" />
                </div>
                <div>
                  <label>
                    Email: <span>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"
                  />
                </div>
                <div>
                  <label>
                    Message: <span>*</span>
                  </label>
                  <textarea
                    name="comment"
                    cols={40}
                    rows={3}
                    id="comment"
                    spellCheck="true"
                    defaultValue={""}
                  />
                </div>
              </fieldset>
              <div id="result" />
              <input
                type="submit"
                className="submit"
                id="submit"
                defaultValue="Send Message"
              />
              <div className="clearfix" />
              <div className="margin-bottom-40" />
            </form>
          </section>
          {/* Contact Form / End */}
        </div>
        {/* Container / End */}
        {/* Sidebar
================================================== */}
        <div className="five columns">
          {/* Information */}
          <h3 className="margin-bottom-10">Information</h3>
          <div className="widget-box">
            <p>
              Morbi eros bibendum lorem ipsum dolor pellentesque pellentesque
              bibendum.{" "}
            </p>
            <ul className="contact-informations">
              <li>45 Park Avenue, Apt. 303</li>
              <li>New York, NY 10016 </li>
            </ul>
            <ul className="contact-informations second">
              <li>
                <i className="fa fa-phone" /> <p>+48 880 440 110</p>
              </li>
              <li>
                <i className="fa fa-envelope" /> <p>mail@example.com</p>
              </li>
              <li>
                <i className="fa fa-globe" /> <p>www.example.com</p>
              </li>
            </ul>
          </div>
          {/* Social */}
          <div className="widget margin-top-30">
            <h3 className="margin-bottom-5">Social Media</h3>
            <ul className="social-icons">
              <li>
                <a className="facebook" href>
                  <i className="icon-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" href>
                  <i className="icon-twitter" />
                </a>
              </li>
              <li>
                <a className="gplus" href>
                  <i className="icon-gplus" />
                </a>
              </li>
              <li>
                <a className="linkedin" href>
                  <i className="icon-linkedin" />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
            <div className="margin-bottom-50" />
          </div>
        </div>
      </div>
      {/* Container / End */}
    </div>
  );
};

export default Contact;
