import React from "react";

const Page = ({ data = [] }) => {
  console.log(data);
  return (
    <div>
      <p>""</p>
      <p>""</p>
      <p>""</p>
      <h3>Sample Page Component</h3>
      {data.map((job, i) => {
        return (
          <div key={i}>
            <p>Name ~ {job.fullName}</p>
            <p>isActive ~ {`${job.isActive}`}</p>
            <p>isStaff ~ {`${job.isStaff}`}</p>
            <p>id ~ {job.id}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
