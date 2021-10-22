import React from "react";

const VacancyLoader = () => {
  return (
    <div className="bg-white p-2 sm:p-4 sm:h-40 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none mb-4">
      <div className="h-52 sm:h-full sm:w-48 rounded-xl bg-gray-200 animate-pulse"></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-6 rounded-2xl"></div>
          <div className="flex gap-3">
            <div className="bg-gray-200 w-40 animate-pulse h-5 rounded-2xl"></div>
            <div className="ml-auto bg-gray-200 w-20 h-5 animate-pulse rounded-full"></div>
          </div>
          <div className="bg-gray-200 animate-pulse w-50 h-3 rounded-2xl"></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="bg-gray-200 w-20 h-5 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-20 h-5 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-20 h-5 animate-pulse rounded-full ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default VacancyLoader;
