import React from "react";
export const EAlt1 = () => (
  <div className="container">
    <div className="row">
      <div className="col-lg-12 card-margin">
        <div className="card search-form">
          <div className="card-body p-0">
            <form id="search-form">
              <div className="row">
                <div className="col-12">
                  <div className="row no-gutters">
                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                      >
                        <option>Location</option>
                        <option>London</option>
                        <option>Boston</option>
                        <option>Mumbai</option>
                        <option>New York</option>
                        <option>Toronto</option>
                        <option>Paris</option>
                      </select>
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        id="search"
                        name="search"
                      />
                    </div>
                    <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                      <button type="submit" className="btn btn-base">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-search"
                        >
                          <circle cx={11} cy={11} r={8} />
                          <line x1={21} y1={21} x2="16.65" y2="16.65" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="card card-margin">
          <div className="card-body">
            <div className="row search-body">
              <div className="col-lg-12">
                <div className="search-result">
                  <div className="result-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="records">
                          Showing: <b>1-20</b> of <b>200</b> result
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="result-actions">
                          <div className="result-sorting">
                            <span>Sort By:</span>
                            <select
                              className="form-control border-0"
                              id="exampleOption"
                            >
                              <option value={1}>Relevance</option>
                              <option value={2}>Names (A-Z)</option>
                              <option value={3}>Names (Z-A)</option>
                            </select>
                          </div>
                          <div className="result-views">
                            <button
                              type="button"
                              className="btn btn-soft-base btn-icon"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-list"
                              >
                                <line x1={8} y1={6} x2={21} y2={6} />
                                <line x1={8} y1={12} x2={21} y2={12} />
                                <line x1={8} y1={18} x2={21} y2={18} />
                                <line x1={3} y1={6} x2={3} y2={6} />
                                <line x1={3} y1={12} x2={3} y2={12} />
                                <line x1={3} y1={18} x2={3} y2={18} />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="btn btn-soft-base btn-icon"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-grid"
                              >
                                <rect x={3} y={3} width={7} height={7} />
                                <rect x={14} y={3} width={7} height={7} />
                                <rect x={14} y={14} width={7} height={7} />
                                <rect x={3} y={14} width={7} height={7} />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="result-body">
                    <div className="table-responsive">
                      <table className="table widget-26">
                        <tbody>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">
                                  Senior Software Engineer / Developer
                                </a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    Axiom Corp.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    1 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Full-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">London, UK</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 50/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-base">
                                <i className="indicator bg-base" />
                                <span>Software Development</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">
                                  Marketing &amp; Communication Supervisor
                                </a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    AxiomUI Llc.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    2 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">New York, US</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 60/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-warning">
                                <i className="indicator bg-warning" />
                                <span>Marketing</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">Senior Data Analyst / Scientist</a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    AxiomUI Inc.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    4 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">New York, US</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 60/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-success">
                                <i className="indicator bg-success" />
                                <span>Artificial Intelligence</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">UX Designer &amp; UI Developer</a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    AxiomUI Inc.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    5 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">Toronto, CAN</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 35/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-danger">
                                <i className="indicator bg-danger" />
                                <span>Design</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">
                                  Information Security Analyst / Expert
                                </a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    Axiom Corp.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    6 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">Mumbai, IN</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 70/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-info">
                                <i className="indicator bg-info" />
                                <span>Infra Supervision</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star starred"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">
                                  Senior Software Engineer / Developer
                                </a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    Axiom Corp.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    1 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Full-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">London, UK</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 50/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-base">
                                <i className="indicator bg-base" />
                                <span>Software Development</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">
                                  Marketing &amp; Communication Supervisor
                                </a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    AxiomUI Llc.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    2 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">New York, US</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 60/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-warning">
                                <i className="indicator bg-warning" />
                                <span>Marketing</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">Senior Data Analyst / Scientist</a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    AxiomUI Inc.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    4 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">New York, US</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 60/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-success">
                                <i className="indicator bg-success" />
                                <span>Artificial Intelligence</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">UX Designer &amp; UI Developer</a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    AxiomUI Inc.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    5 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">Toronto, CAN</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 35/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-danger">
                                <i className="indicator bg-danger" />
                                <span>Design</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="widget-26-job-emp-img">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                  alt="Company"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-title">
                                <a href="#">
                                  Information Security Analyst / Expert
                                </a>
                                <p className="m-0">
                                  <a href="#" className="employer-name">
                                    Axiom Corp.
                                  </a>{" "}
                                  <span className="text-muted time">
                                    6 days ago
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-info">
                                <p className="type m-0">Part-Time</p>
                                <p className="text-muted m-0">
                                  in{" "}
                                  <span className="location">Mumbai, IN</span>
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-salary">
                                $ 70/hr
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-category bg-soft-info">
                                <i className="indicator bg-info" />
                                <span>Infra Supervision</span>
                              </div>
                            </td>
                            <td>
                              <div className="widget-26-job-starred">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star starred"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nav className="d-flex justify-content-center">
              <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
                <li className="page-item">
                  <a className="page-link no-border" href="#">
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link no-border" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link no-border" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link no-border" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link no-border" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link no-border" href="#">
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
);
const EAlt = () => {
  const [open, setOpen] = React.useState(false);
  if (!open) {
    return <button onClick={() => setOpen(true)}>open </button>;
  } else {
    return (
      <div
        className="fixed inset-0 overflow-hidden"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/*
Background overlay, show/hide based on slide-over state.

Entering: "ease-in-out duration-500"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "ease-in-out duration-500"
  From: "opacity-100"
  To: "opacity-0"
    */}
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            {/*
  Slide-over panel, show/hide based on slide-over state.

  Entering: "transform transition ease-in-out duration-500 sm:duration-700"
    From: "translate-x-full"
    To: "translate-x-0"
  Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
    From: "translate-x-0"
    To: "translate-x-full"
*/}
            <div className="relative w-screen max-w-md">
              {/*
    Close button, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  */}
              <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Close panel</span>
                  {/* Heroicon name: outline/x */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div className="px-4 sm:px-6">
                  <h2
                    className="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Panel title
                  </h2>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  {/* Replace with your content */}
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div
                      className="h-full border-2 border-dashed border-gray-200"
                      aria-hidden="true"
                    />
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EAlt;
