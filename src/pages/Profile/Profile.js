import PasswordChange from "containers/Authentication/PasswordChange";
import React from "react";

function Profile() {
  return (
    <div className="row">
      {/* Profile */}

      <div className="col-lg-6 col-md-12">
        <div className="dashboard-list-box margin-top-0">
          <h4 className="gray">Profile Details</h4>
          <div className="dashboard-list-box-static">
            {/* Avatar */}
            <div className="edit-profile-photo">
              <img
                src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=300"
                alt="profile-img"
              />
              <div className="change-photo-btn">
                <div className="photoUpload">
                  <span>
                    <i className="fa fa-upload" /> Upload Photo
                  </span>
                  <input type="file" className="upload" />
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="my-profile">
              <label>Your Name</label>
              <input defaultValue="Tom Perrin" type="text" />
              <label>Phone</label>
              <input defaultValue="(123) 123-456" type="text" />
              <label>Email</label>
              <input defaultValue="tom@example.com" type="text" />
              <label>Notes</label>
              <textarea
                name="notes"
                id="notes"
                cols={30}
                rows={10}
                defaultValue={
                  "Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper"
                }
              />
              <label>
                <i className="fa fa-twitter" /> Twitter
              </label>
              <input placeholder="https://www.twitter.com/" type="text" />
              <label>
                <i className="fa fa-facebook-square" /> Facebook
              </label>
              <input placeholder="https://www.facebook.com/" type="text" />
              <label>
                <i className="fa fa-google-plus" /> Google+
              </label>
              <input placeholder="https://www.google.com/" type="text" />
            </div>
            <button className="button margin-top-15">Save Changes</button>
          </div>
        </div>
      </div>
      {/* Change Password */}
      <div className="my-acccount">
        {" "}
        <div className="col-lg-6 col-md-12">
          <div className="dashboard-list-box margin-top-0">
            <h4 className="gray">Change Password</h4>
            <div className="dashboard-list-box-static">
              {/* Change Password */}
              <div className="my-profile">
                <PasswordChange />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
