import React from "react";

const CategoriesSection = () => {
  return (
    <div className="container-x">
      <div className="sixteen columns">
        <h3 className="margin-bottom-20 margin-top-10">Popular Categories</h3>
        {/* Popular Categories */}
        <div className="categories-boxes-container">
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln ln-icon-Bar-Chart" />
            <h4>Accouting / Finance</h4>
            <span>32</span>
          </a>
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln ln-icon-Car" />
            <h4>Automotive Jobs</h4>
            <span>76</span>
          </a>
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln  ln-icon-Worker" />
            <h4>Construction / Facilities</h4>
            <span>31</span>
          </a>
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln  ln-icon-Student-Female" />
            <h4>Education / Training</h4>
            <span>76</span>
          </a>
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln ln-icon-Medical-Sign" />
            <h4>Healthcare</h4>
            <span>32</span>
          </a>
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln ln-icon-Plates" />
            <h4>Restarant / Food Service</h4>
            <span>67</span>
          </a>
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln ln-icon-Globe" />
            <h4>Transportation / Logistics</h4>
            <span>45</span>
          </a>
          {/* Box */}
          <a href="browse-jobs.html" className="category-small-box">
            <i className="ln   ln-icon-Laptop-3" />
            <h4>Telecommunication</h4>
            <span>96</span>
          </a>
        </div>
        <div className="clearfix" />
        <div className="margin-top-30" />
        <a href="browse-categories.html" className="button centered">
          Browse All Categories
        </a>
        <div className="margin-bottom-55" />
      </div>
    </div>
  );
};

export default CategoriesSection;
