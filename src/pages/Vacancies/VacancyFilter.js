import React, {useContext} from "react";
import styled from 'styled-components';
import Button from "components/Button/Button";
import { VacancyContext } from 'contexts/vacancies/vacancies.context'


const VacancyFilter = ({ sortTypes, setSortTypes, jobTypeSort, rate, setRate, ratePerHour, loading, sortByValue,setSortByValue, loadFilterValues }) => {
  const { vacancyState, vacancyDispatch } = useContext(VacancyContext);
  let sortByOption;
  /**
   * @param  {} e
   * A function that will handle all api calls for the vacancy filter.
   */
  const handleSortByInput = () => {
      const sortOption = document.getElementById('sortSelect');
      if (sortOption.value === 'salary') {
        setSortByValue({
          direction: 'ASC',
          field: sortOption.value.toUpperCase()
        })
      } else if (sortOption.value === '-salary') {
        setSortByValue({
          direction: 'DESC',
          field: sortOption.value.toUpperCase().slice(1)
        })
      } else if (sortOption.value === 'title') {
        setSortByValue({
          direction: 'ASC',
          field: sortOption.value.toUpperCase()
        })
      } else if (sortOption.value === '-title') {
        setSortByValue({
          direction: 'DESC',
          field: sortOption.value.toUpperCase().slice(1)
        })
      } else {
        sortByOption = sortOption.value;
      }
  }

  const addRateTypes = (checked, value) => {
    if (checked && !rate.includes(value)) {
      setRate([...rate, value]);
    } else {
      let newRateTypes = rate.filter(rateObj => rateObj.name !== value.name);
      setRate([...newRateTypes]);
    }
  }

  const addJobTypes = (checked, value) => {
    if (checked && !sortTypes.includes(value)) {
      setSortTypes([...sortTypes, value])
    } else {
      let newSortTypes = sortTypes.filter(types => types !== value);
      setSortTypes([...newSortTypes])
    }
  }

  
  /**
   * @param  {} type
   * Add the selected job types into one array, then use the array to sort
   * the jobs.
   */
  const handleJobTypes = (type) => {
    const {value, checked} = type.target;

    if (value === 'check-1') {
      addJobTypes(checked, 'any')
    } else if (value === 'check-2') {
      addJobTypes(checked, 'FULL_TIME');
    } else if (value === 'check-3') {
      addJobTypes(checked, 'PART_TIME');
    } else if (value === 'check-4') {
      addJobTypes(checked, 'INTERNSHIP');
    } else if (value === 'check-5') {
      addJobTypes(checked, 'GIG');
    }


  }

    /**
   * @param  {} type
   * Add the selected rate into one array, then use the array to sort
   * the jobs.
   */
     const handleRateTypes = (type) => {
      const {value, checked} = type.target;
  
      if (value === 'check-6') {
        addRateTypes(checked, {name: value, lowerLimit: 'any', upperLimit: 'any'});
      } else if (value === 'check-7') {
        addRateTypes(checked, {name: value, lowerLimit: 0, upperLimit: 25});
      } else if (value === 'check-8') {
        addRateTypes(checked, {name: value, lowerLimit: 26, upperLimit: 50});
      } else if (value === 'check-9') {
        addRateTypes(checked, {name: value, lowerLimit: 51, upperLimit: 100});
      } else if (value === 'check-10') {
        addRateTypes(checked, {name: value, lowerLimit: 101, upperLimit: 200});
      } else if (value === 'check-11') {
        addRateTypes(checked, {name: value, lowerLimit: 201, upperLimit: 201});
      }
    }

    const handleDispatch = (jobs) => {
      vacancyDispatch({
        type: "SORT_JOBS",
        payload: jobs
      });
    }

    const handleSubmit = () => {
      console.log("sortByOption", sortByOption);
      // Call the sorting functions.
      // jobTypeSort();
      // ratePerHour();

      // Reverse the vacancies array inorder to display the latests results
      // and present it as it is when we want the oldest results.
      if (sortByOption === 'updated_at') {
        if (vacancyState.jobsData.length > 0) {
          handleDispatch(vacancyState.jobsData);
        }
      } else if (sortByOption === '-updated_at') {
        if (vacancyState.jobsData.length > 0) {
          handleDispatch(vacancyState.jobsData.reverse());
        }
      } else {
        loadFilterValues(
          {variables: { 
            first: 10, 
            sortBy: {
              direction: sortByValue.direction,
              field: sortByValue.field
            } 
          }
        });
      }
    }

  return (
        <div className="five columns">
          {/* Search */}
          <div className="widget">
            <h4>Search</h4>
            <form action="#" method="get">
              <input type="text" placeholder="Search input..." />
            </form>
          </div>
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
              <option selected="selected" value="salary">
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
            <h4>Job Type</h4>
            <ul className="checkboxes">
              <li>
                <input
                  id="check-1"
                  type="checkbox"
                  name="check"
                  defaultValue="check-1"
                  defaultChecked
                  onChange={(e) => handleJobTypes(e)}
                />
                <label htmlFor="check-1">Any Type</label>
              </li>
              <li>
                <input
                  id="check-2"
                  type="checkbox"
                  name="check"
                  defaultValue="check-2"
                  onChange={(e) => handleJobTypes(e)}
                />
                <label htmlFor="check-2">
                  Full-Time <span>(312)</span>
                </label>
              </li>
              <li>
                <input
                  id="check-3"
                  type="checkbox"
                  name="check"
                  defaultValue="check-3"
                  onChange={(e) => handleJobTypes(e)}
                />
                <label htmlFor="check-3">
                  Part-Time <span>(269)</span>
                </label>
              </li>
              <li>
                <input
                  id="check-4"
                  type="checkbox"
                  name="check"
                  defaultValue="check-4"
                  onChange={(e) => handleJobTypes(e)}
                />
                <label htmlFor="check-4">
                  Internship <span>(46)</span>
                </label>
              </li>
              <li>
                <input
                  id="check-5"
                  type="checkbox"
                  name="check"
                  defaultValue="check-5"
                  onChange={(e) => handleJobTypes(e)}
                />
                <label htmlFor="check-5">
                  Freelance <span>(119)</span>
                </label>
              </li>
            </ul>
          </div>
          {/* Rate/Hr */}
          <div className="widget">
            <h4>Rate / Hr</h4>
            <ul className="checkboxes">
              <li>
                <input
                  id="check-6"
                  type="checkbox"
                  name="check"
                  defaultValue="check-6"
                  defaultChecked
                  onChange={(e) => handleRateTypes(e)}
                />
                <label htmlFor="check-6">Any Rate</label>
              </li>
              <li>
                <input
                  id="check-7"
                  type="checkbox"
                  name="check"
                  defaultValue="check-7"
                  onChange={(e) => handleRateTypes(e)}
                />
                <label htmlFor="check-7">
                  $0 - $25 <span>(231)</span>
                </label>
              </li>
              <li>
                <input
                  id="check-8"
                  type="checkbox"
                  name="check"
                  defaultValue="check-8"
                  onChange={(e) => handleRateTypes(e)}
                />
                <label htmlFor="check-8">
                  $25 - $50 <span>(297)</span>
                </label>
              </li>
              <li>
                <input
                  id="check-9"
                  type="checkbox"
                  name="check"
                  defaultValue="check-9"
                  onChange={(e) => handleRateTypes(e)}
                />
                <label htmlFor="check-9">
                  $50 - $100 <span>(78)</span>
                </label>
              </li>
              <li>
                <input
                  id="check-10"
                  type="checkbox"
                  name="check"
                  defaultValue="check-10"
                  onChange={(e) => handleRateTypes(e)}
                />
                <label htmlFor="check-10">
                  $100 - $200 <span>(98)</span>
                </label>
              </li>
              <li>
                <input
                  id="check-11"
                  type="checkbox"
                  name="check"
                  defaultValue="check-11"
                  onChange={(e) => handleRateTypes(e)}
                />
                <label htmlFor="check-11">
                  $200+ <span>(21)</span>
                </label>
              </li>
            </ul>
          </div>
          <Spacer>
            <Button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                loading={loading}
                title={loading ? "Applying filter ... " : "Apply filters"}
                style={{ color: "#ffffff" }}
              />
          </Spacer>
        </div>
  );
};

const Spacer = styled.div`
  margin: 15px 0;
`

export default VacancyFilter;
