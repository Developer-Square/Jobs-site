import React from "react";
import Industries from "./Industries";
import Payments from "./Payments";
import UserStats from "./UserStats";

const tabs = ["Industries", "Payments", "UserStats"];

const Admin = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const handleTabs = (tab) => {
    setActiveTab((curr) => tab);
  };
  return (
    <div>
      <ul className="flex justify-center items-center my-4">
        {tabs.map((tab, i) => (
          <li
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() => handleTabs(tab)}
            className={
              activeTab === tab
                ? "text-green-500 border-green-500"
                : "cursor-pointer py-2 px-4 text-gray-500 border-b-8"
            }
          >
            {tab}
          </li>
        ))}
      </ul>
      {activeTab === "Industries" && <Industries />}
      {activeTab === "Payments" && <Payments />}
      {activeTab === "UserStats" && <UserStats />}
    </div>
  );
};

export default Admin;
