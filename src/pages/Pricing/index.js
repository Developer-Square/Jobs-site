import React from "react";

const Pricing = () => {
  return (
    <div>
      {/* Titlebar
================================================== */}
      <div id="titlebar" className="single">
        <div className="container-x">
          <div className="sixteen columns">
            <h2>Pricing Tables</h2>
            <nav id="breadcrumbs">
              <ul>
                <li>You are here:</li>
                <li>
                  <a href>Home</a>
                </li>
                <li>Pricing</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Pricing Tables
================================================== */}
      {/* Container / Start */}
      <div className="container-x">
        {/* Container / Start */}
        <div className="container-x">
          <div className="sixteen columns">
            <h3 className="margin-bottom-20">Three Tables</h3>
          </div>
          {/* Plan #1 */}
          <div className="plan color-1 one-third column">
            <div className="plan-price">
              <h3>Start Up</h3>
              <span className="plan-currency">Ksh. </span>
              <span className="value">19</span>
            </div>
            <div className="plan-features">
              <ul>
                <li>One Time Fee</li>
                <li>This Plan Includes 1 Job</li>
                <li>Non-Highlighted Post</li>
                <li>Posted For 30 Days</li>
              </ul>
              <a className="button" href>
                <i className="fa fa-shopping-cart" /> Add to Cart
              </a>
            </div>
          </div>
          {/* Plan #2 */}
          <div className="plan color-2 one-third column">
            <div className="plan-price">
              <h3>Company</h3>
              <span className="plan-currency">Ksh. </span>
              <span className="value">59</span>
            </div>
            <div className="plan-features">
              <ul>
                <li>One Time Fee</li>
                <li>This Plan Includes 2 Jobs</li>
                <li>Highlighted Job Post</li>
                <li>Posted For 60 Days</li>
              </ul>
              <a className="button" href>
                <i className="fa fa-shopping-cart" /> Add to Cart
              </a>
            </div>
          </div>
          {/* Plan #3 */}
          <div className="plan color-1 one-third column">
            <div className="plan-price">
              <h3>Enterprise</h3>
              <span className="plan-currency">Ksh. </span>
              <span className="value">99</span>
            </div>
            <div className="plan-features">
              <ul>
                <li>One Time Fee</li>
                <li>This Plan Includes 4 Jobs</li>
                <li>2 Highlighted Job Posts</li>
                <li>Posted For 90 Days</li>
              </ul>
              <a className="button" href>
                <i className="fa fa-shopping-cart" /> Add to Cart
              </a>
            </div>
          </div>
        </div>
        {/* Container / End */}
        <br />
        <br />
        <div className="sixteen columns">
          <h3 className="margin-bottom-20">Four Tables</h3>
        </div>
        {/* Plan #1 */}
        <div className="plan color-1 four columns">
          <div className="plan-price">
            <h3>Start Up</h3>
            <span className="plan-currency">Ksh. </span>
            <span className="value">19</span>
          </div>
          <div className="plan-features">
            <ul>
              <li>One Time Fee</li>
              <li>This Plan Includes 1 Job</li>
              <li>Non-Highlighted Post</li>
              <li>Posted For 30 Days</li>
            </ul>
            <a className="button" href>
              <i className="fa fa-shopping-cart" /> Add to Cart
            </a>
          </div>
        </div>
        {/* Plan #2 */}
        <div className="plan color-1 four columns">
          <div className="plan-price">
            <h3>Company</h3>
            <span className="plan-currency">Ksh. </span>
            <span className="value">59</span>
          </div>
          <div className="plan-features">
            <ul>
              <li>One Time Fee</li>
              <li>This Plan Includes 2 Jobs</li>
              <li>Highlighted Job Post</li>
              <li>Posted For 60 Days</li>
            </ul>
            <a className="button" href>
              <i className="fa fa-shopping-cart" /> Add to Cart
            </a>
          </div>
        </div>
        {/* Plan #3 */}
        <div className="plan color-2 four columns">
          <div className="plan-price">
            <h3>Enterprise</h3>
            <span className="plan-currency">Ksh. </span>
            <span className="value">99</span>
          </div>
          <div className="plan-features">
            <ul>
              <li>One Time Fee</li>
              <li>This Plan Includes 4 Jobs</li>
              <li>2 Highlighted Job Posts</li>
              <li>Posted For 90 Days</li>
            </ul>
            <a className="button" href>
              <i className="fa fa-shopping-cart" /> Add to Cart
            </a>
          </div>
        </div>
        {/* Plan #4 */}
        <div className="plan color-1 four columns">
          <div className="plan-price">
            <h3>Extended</h3>
            <span className="plan-currency">Ksh. </span>
            <span className="value">199</span>
          </div>
          <div className="plan-features">
            <ul>
              <li>One Time Fee</li>
              <li>This Plan Includes 10 Jobs</li>
              <li>5 Highlighted Job Posts</li>
              <li>Posted For 180 Days</li>
            </ul>
            <a className="button" href>
              <i className="fa fa-shopping-cart" /> Add to Cart
            </a>
          </div>
        </div>
      </div>
      {/* Container / End */}
      <br />
    </div>
  );
};

export default Pricing;
