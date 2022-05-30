import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import Button from "components/Button/Button";
import SearchForm from "containers/Search/SearchForm";
import { IsNotEmpty } from "helpers/index";
import { VacancyContext } from "contexts/vacancies/vacancies.context";
import { vacancyLimit } from "constants/constants";
import PayrateSlider from "components/Slider/Slider";
import {
  parse as parseQs,
  // ParsedQuery,
  stringify as stringifyQs,
} from "query-string";

const VacancyFilter = ({
  rate,
  setRate,
  ratePerHour,
  loading,
  loadFilterValues,
  setGetJobs,
  getJobs,
  sortByValue,
  setSortByValue,
  callLoadFilters,
  setFilterObj,
  filterObj,
  clean,
}) => {
  const [searchString, setSearchString] = React.useState("");

  const [sortTypes, setSortTypes] = React.useState([]);
  const { vacancyState } = useContext(VacancyContext);
  let sortBy;

  const getDefaultValues = () => {
    handleSortByInput();
    const checkboxes = Array.from(document.getElementsByName("check"));
    checkboxes.map((check) => {
      if (check.checked) {
        handleJobTypes(check.value, check.checked);
        handleRateTypes(check.value, check.checked);
      }
      return null;
    });
  };

  useEffect(() => {
    // Set the default value.
    console.log(stringifyQs(filterObj));
    getDefaultValues();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log("----------------", filterObj);
    console.log("==================", stringifyQs(filterObj));

    const searchStr = parseQs(stringifyQs(filterObj));
    console.log("==================", parseQs(stringifyQs(filterObj)));
    console.log("==================", searchStr);
  }, [filterObj]);

  useEffect(() => {
    // Only fetch if context API is empty.
    if (vacancyState.jobsData.length === 0) {
      // Fetch according to the default filters.
      if (IsNotEmpty(sortByValue)) {
        loadFilterValues({
          variables: {
            first: vacancyLimit,
            sortBy: {
              direction: sortByValue.direction,
              field: sortByValue.field,
            },
          },
        });
      }
    }

    // eslint-disable-next-line
  }, [sortByValue, sortBy]);

  window.onload = function () {
    sortBy = document.querySelector("#sortSelect_chosen");
    if (sortBy) {
      sortBy.addEventListener("click", (e) => {
        handleSortByInput(e);
      });
    }
  };

  /**
   * @param  {} e
   * A function that will handle all api calls for the vacancy filter.
   */
  const handleSortByInput = (e) => {
    let sortOption = document.getElementById("sortSelect");

    if (sortOption.style.display === "none" && e) {
      sortOption = e.target;
    }

    // Clear the field incase the user selects a different option other than
    // newest jobs or oldest jobs.
    setGetJobs("");
    if (
      sortOption.value === "salary" ||
      sortOption.innerHTML === "Salary Low-High"
    ) {
      setSortByValue({
        direction: "ASC",
        field: "SALARY",
      });
    } else if (
      sortOption.value === "-salary" ||
      sortOption.innerHTML === "Salary High-Low"
    ) {
      setSortByValue({
        direction: "DESC",
        field: "SALARY",
      });
    } else if (
      sortOption.value === "title" ||
      sortOption.innerHTML === "Name Increasing"
    ) {
      setSortByValue({
        direction: "ASC",
        field: "TITLE",
      });
    } else if (
      sortOption.value === "-title" ||
      sortOption.innerHTML === "Name Decreasing"
    ) {
      setSortByValue({
        direction: "DESC",
        field: "TITLE",
      });
    } else if (
      sortOption.value === "-updated_at" ||
      sortOption.innerHTML === "Newest jobs"
    ) {
      setSortByValue({
        direction: "DESC",
        field: "CREATED_AT",
      });
    } else {
      setSortByValue({
        direction: "ASC",
        field: "CREATED_AT",
      });
    }
  };

  const addRateTypes = (checked, value) => {
    const filterTypes = (types) => types !== value;
    // Don't add the any option to the filterObj.
    // To solve the double UI issue.
    // Adding more payRate if the field already exists
    if (checked && value !== "any" && filterObj.payRate) {
      setSortTypes([...sortTypes, value]);
      setFilterObj({
        ...filterObj,
        payRate: [...filterObj.payRate, value],
      });
    }
    // Adding new payRate
    else if (checked && value !== "any") {
      setSortTypes([...sortTypes, value]);
      setFilterObj({
        ...filterObj,
        payRate: [value],
      });
    } else if (value === "any") {
      setFilterObj({
        ...filterObj,
        payRate: [],
      });
    } else {
      let newSortTypes = sortTypes.filter(filterTypes);
      setSortTypes([...newSortTypes]);
      setFilterObj({
        ...filterObj,
        payRate: filterObj.payRate.filter(filterTypes),
      });
    }
  };

  const addJobTypes = (checked, value) => {
    const filterTypes = (types) => types !== value;
    // Don't add the any option to the filterObj.
    // To solve the double UI issue.
    // Adding more jobTypes if the field already exists
    if (checked && value !== "any" && filterObj.jobTypes) {
      setSortTypes([...sortTypes, value]);
      setFilterObj({
        ...filterObj,
        jobTypes: [...filterObj.jobTypes, value],
      });
    }
    // Adding new jobTypes
    else if (checked && value !== "any") {
      setSortTypes([...sortTypes, value]);
      setFilterObj({
        ...filterObj,
        jobTypes: [value],
      });
    } else if (value === "any") {
      setFilterObj({
        ...filterObj,
        jobTypes: [],
      });
    } else {
      let newSortTypes = sortTypes.filter(filterTypes);
      setSortTypes([...newSortTypes]);
      setFilterObj({
        ...filterObj,
        jobTypes: filterObj.jobTypes.filter(filterTypes),
      });
    }
  };

  /**
   * @param  {} type
   * Add the selected job types into one array, then use the array to sort
   * the jobs.
   */
  const handleJobTypes = (value, checked) => {
    if (value === "check-1") {
      addJobTypes(checked, "any");
    } else if (value === "check-2") {
      addJobTypes(checked, "Full-Time");
    } else if (value === "check-3") {
      addJobTypes(checked, "Part-Time");
    } else if (value === "check-4") {
      addJobTypes(checked, "Internship");
    } else if (value === "check-5") {
      addJobTypes(checked, "Gig");
    }
  };

  /**
   * @param  {} type
   * Add the selected rate into one array, then use the array to sort
   * the jobs.
   */
  const handleRateTypes = (value, checked) => {
    if (value === "check-6") {
      addRateTypes(checked, "any");
    } else if (value === "check-7") {
      addRateTypes(checked, "Hour");
    } else if (value === "check-8") {
      addRateTypes(checked, "Day");
    } else if (value === "check-9") {
      addRateTypes(checked, "Week");
    } else if (value === "check-10") {
      addRateTypes(checked, "Month");
    }
  };

  const handleSubmit = () => {
    const cleanedValues = clean(filterObj);
    // Call the sorting functions.
    // Only sort by rate if there are no API calls.
    if (
      rate.lowerLimit !== "any" &&
      Object.values(cleanedValues).length === 0
    ) {
      ratePerHour();
    }

    // Check whether the search field or sortTypes are empty.
    if (
      (searchString.length > 0 && IsNotEmpty(sortByValue)) ||
      (sortTypes.length > 0 && IsNotEmpty(sortByValue)) ||
      IsNotEmpty(sortByValue)
    ) {
      // Ensure the sortbyValue is not empty.
      if (Object.keys(sortByValue) !== 0) {
        callLoadFilters("", "", vacancyLimit, 0);
      }
    }
  };
  console.log(clean(filterObj));
  console.log(clean(filterObj)?.jobTypes);

  return (
    <div className="five columns">
      <SearchForm
        setSearchString={setSearchString}
        filterObj={filterObj}
        setFilterObj={setFilterObj}
      />
      {/* Sort by */}
      <div className="widget">
        <h4>Sort by</h4>
        {/* Select */}
        <select
          data-placeholder="Choose Category"
          className="chosen-select-no-single"
          id="sortSelect"
          onChange={handleSortByInput}
        >
          <option defaultValue value="salary">
            Salary Low-High
          </option>
          <option value="-salary">Salary High-Low</option>
          <option value="title">Name Increasing</option>
          <option value="-title">Name Decreasing</option>
          <option value="updated_at">Oldest jobs</option>
          <option value="-updated_at">Newest jobs</option>
        </select>
      </div>
      {/* Job Type */}
      <div className="widget">
        <h4>Type</h4>
        <ul className="checkboxes">
          <li>
            <input
              id="check-1"
              type="checkbox"
              name="check"
              defaultValue="check-1"
              defaultChecked
              checked={
                clean(filterObj)?.jobTypes?.length === 4 ||
                !clean(filterObj)?.jobTypes
              }
              onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
            />
            <label htmlFor="check-1">Any Type</label>
          </li>
          <li>
            <input
              id="check-2"
              type="checkbox"
              name="check"
              defaultValue="check-2"
              checked={clean(filterObj)?.jobTypes?.includes("Full-Time")}
              onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
            />
            <label htmlFor="check-2">Full-Time</label>
          </li>
          <li>
            <input
              id="check-3"
              type="checkbox"
              name="check"
              defaultValue="check-3"
              checked={clean(filterObj)?.jobTypes?.includes("Part-Time")}
              onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
            />
            <label htmlFor="check-3">Part-Time</label>
          </li>
          <li>
            <input
              id="check-4"
              type="checkbox"
              name="check"
              defaultValue="check-4"
              checked={clean(filterObj)?.jobTypes?.includes("Internship")}
              onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
            />
            <label htmlFor="check-4">Internship</label>
          </li>
          <li>
            <input
              id="check-5"
              type="checkbox"
              name="check"
              defaultValue="check-5"
              checked={clean(filterObj)?.jobTypes?.includes("Gig")}
              onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
            />
            <label htmlFor="check-5">Freelance</label>
          </li>
        </ul>
      </div>
      {/* Rate/Hr */}
      <div className="widget">
        <PayrateSlider
          label="Kindly select your payrate: "
          setFilterObj={setFilterObj}
          filterObj={filterObj}
        />
        <h4>Pay Rate</h4>
        <ul className="checkboxes">
          <li>
            <input
              id="check-6"
              type="checkbox"
              name="check"
              defaultValue="check-6"
              defaultChecked
              checked={
                clean(filterObj)?.payRate?.length === 4 ||
                !clean(filterObj)?.payRate
              }
              onChange={(e) =>
                handleRateTypes(e.target.value, e.target.checked)
              }
            />
            <label htmlFor="check-6">Any</label>
          </li>
          <li>
            <input
              id="check-7"
              type="checkbox"
              name="check"
              defaultValue="check-7"
              checked={clean(filterObj)?.payRate?.includes("Hour")}
              onChange={(e) =>
                handleRateTypes(e.target.value, e.target.checked)
              }
            />
            <label htmlFor="check-7">Per Hour</label>
          </li>
          <li>
            <input
              id="check-8"
              type="checkbox"
              name="check"
              defaultValue="check-8"
              checked={clean(filterObj)?.payRate?.includes("Day")}
              onChange={(e) =>
                handleRateTypes(e.target.value, e.target.checked)
              }
            />
            <label htmlFor="check-8">Per Day</label>
          </li>
          <li>
            <input
              id="check-9"
              type="checkbox"
              name="check"
              defaultValue="check-9"
              checked={clean(filterObj)?.payRate?.includes("Week")}
              onChange={(e) =>
                handleRateTypes(e.target.value, e.target.checked)
              }
            />
            <label htmlFor="check-9">Per Week</label>
          </li>
          <li>
            <input
              id="check-10"
              type="checkbox"
              name="check"
              defaultValue="check-10"
              checked={clean(filterObj)?.payRate?.includes("Month")}
              onChange={(e) =>
                handleRateTypes(e.target.value, e.target.checked)
              }
            />
            <label htmlFor="check-10">Per Month</label>
          </li>
        </ul>
      </div>
      <Spacer>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          isLoading={loading}
          title={loading ? "Applying filter ... " : "Apply filters"}
          style={{ color: "#ffffff" }}
        />
      </Spacer>
    </div>
  );
};

const Spacer = styled.div`
  margin: 15px 0;
`;

export default VacancyFilter;
