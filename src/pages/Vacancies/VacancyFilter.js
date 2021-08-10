import React, {useEffect, useContext} from "react";
import styled from 'styled-components';
import Button from "components/Button/Button";
import SearchForm from 'containers/Search/SearchForm'
import { IsNotEmpty } from 'helpers/index'
import { VacancyContext } from 'contexts/vacancies/vacancies.context'
import { vacancyLimit } from 'constants/constants'


const VacancyFilter = ({ rate, setRate, ratePerHour, loading, loadFilterValues, setGetJobs, getJobs, sortByValue, setSortByValue, callLoadFilters, setFilterObj, filterObj, clean}) => {
  const [searchString, setSearchString] = React.useState('');

  const [sortTypes, setSortTypes] = React.useState([]);
  const { vacancyState } = useContext(VacancyContext);
  let sortBy;
  
  const getDefaultValues = () => {
    handleSortByInput();
    const checkboxes = Array.from(document.getElementsByName('check'))
    checkboxes.map(check => {
      if (check.checked) {
        handleJobTypes(check.value, check.checked);
        handleRateTypes(check.value, check.checked);
      }
      return null;
    });
  }

  useEffect(() => {
    // Set the default value.
    getDefaultValues();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // Only fetch if context API is empty.
    if (vacancyState.jobsData.length === 0) { 
      // Fetch according to the default filters.
      if (IsNotEmpty(sortByValue)) {
        loadFilterValues(
          {variables: { 
            first: vacancyLimit, 
            sortBy: {
              direction: sortByValue.direction,
              field: sortByValue.field
            } 
          }
          }
        );
      }
    }

    // eslint-disable-next-line
  }, [sortByValue, sortBy])

  window.onload = function () {
    sortBy = document.querySelector('#sortSelect_chosen');
    if (sortBy) {
      sortBy.addEventListener('click', (e) => {
        handleSortByInput(e);
      })
    }
  }

  /**
   * @param  {} e
   * A function that will handle all api calls for the vacancy filter.
   */
  const handleSortByInput = (e) => {
    let sortOption = document.getElementById('sortSelect');
    
    if (sortOption.style.display === 'none' && e) {
      sortOption = e.target;
    }

    // Clear the field incase the user selects a different option other than
    // newest jobs or oldest jobs.
    setGetJobs('');
    if (sortOption.value === 'salary' || sortOption.innerHTML === 'Salary Low-High') {
      setSortByValue({
        direction: 'ASC',
        field: 'SALARY'
      });
    } else if (sortOption.value === '-salary' || sortOption.innerHTML === 'Salary High-Low') {
      setSortByValue({
        direction: 'DESC',
        field: 'SALARY'
      });
    } else if (sortOption.value === 'title' || sortOption.innerHTML === 'Name Increasing') {
      setSortByValue({
        direction: 'ASC',
        field: 'TITLE'
      });
    } else if (sortOption.value === '-title' || sortOption.innerHTML === 'Name Decreasing') {
      setSortByValue({
        direction: 'DESC',
        field: 'TITLE'
      });
    } else if (sortOption.value === '-updated_at' || sortOption.innerHTML === 'Newest jobs') {
      setSortByValue({
        direction: 'DESC',
        field: 'CREATED_AT'
      });
    } else {
      setSortByValue({
        direction: 'ASC',
        field: 'CREATED_AT'
      });
    }
  }

  const addRateTypes = (checked, value) => {
    const filterRates = rateObj => rateObj.name !== value.name;
    if (checked && value.lowerLimit !== 'any') {
      setRate([...rate, value]);
    } else if (value.lowerLimit === 'any') {
      setRate([]);
    } else {
      let newRateTypes = rate.filter(filterRates);
      setRate([...newRateTypes]);
    }
  }

  const addJobTypes = (checked, value) => {
    const filterTypes = types => types !== value;
    // Don't add the any option to the filterObj.
    // To solve the double UI issue.
    // Adding more jobTypes if the field already exists
    if (checked && value !== 'any' && filterObj.jobTypes) {
      setSortTypes([...sortTypes, value])
      setFilterObj({
        ...filterObj,
        jobTypes: [...filterObj.jobTypes, value]
      })
    } 
    // Adding new jobTypes
    else if (checked && value !== 'any') {
      setSortTypes([...sortTypes, value])
      setFilterObj({
        ...filterObj,
        jobTypes: [value]
      })
    } else if (value === 'any') {
      setFilterObj({
        ...filterObj,
        jobTypes: []
      });
    } else {
      let newSortTypes = sortTypes.filter(filterTypes);
      setSortTypes([...newSortTypes])
      setFilterObj({
        ...filterObj,
        jobTypes: filterObj.jobTypes.filter(filterTypes)
      })
    }
  }

  
  /**
   * @param  {} type
   * Add the selected job types into one array, then use the array to sort
   * the jobs.
   */
  const handleJobTypes = (value, checked) => {
    if (value === 'check-1') {
      addJobTypes(checked, 'any')
    } else if (value === 'check-2') {
      addJobTypes(checked, 'Full-Time');
    } else if (value === 'check-3') {
      addJobTypes(checked, 'Part-Time');
    } else if (value === 'check-4') {
      addJobTypes(checked, 'Internship');
    } else if (value === 'check-5') {
      addJobTypes(checked, 'Gig');
    }
  }

    /**
   * @param  {} type
   * Add the selected rate into one array, then use the array to sort
   * the jobs.
   */
    const handleRateTypes = (value, checked) => {

    if (value === 'check-6') {
      addRateTypes(checked, {name: value, lowerLimit: 'any', upperLimit: 'any'});
    } else if (value === 'check-7') {
      addRateTypes(checked, {name: value, lowerLimit: 0, upperLimit: 1000});
    } else if (value === 'check-8') {
      addRateTypes(checked, {name: value, lowerLimit: 1001, upperLimit: 2500});
    } else if (value === 'check-9') {
      addRateTypes(checked, {name: value, lowerLimit: 2501, upperLimit: 5000});
    } else if (value === 'check-10') {
      addRateTypes(checked, {name: value, lowerLimit: 5001, upperLimit: 10000});
    } else if (value === 'check-11') {
      addRateTypes(checked, {name: value, lowerLimit: 10001, upperLimit: 10001});
    }
  }



  const handleSubmit = () => {
    const cleanedValues = clean(filterObj);
    // Call the sorting functions.
    // Only sort by rate if there are no API calls.
    if (rate.lowerLimit !== 'any' && Object.values(cleanedValues).length === 0) {
      ratePerHour();
    }
    
    // Check whether the search field or sortTypes are empty.
    if ((searchString.length > 0 && IsNotEmpty(sortByValue)) || (sortTypes.length > 0 && IsNotEmpty(sortByValue))  || (IsNotEmpty(sortByValue))) {
      // Ensure the sortbyValue is not empty.
      if (Object.keys(sortByValue) !== 0) {
        callLoadFilters('', '', vacancyLimit, 0)
      }
    }
  }

  return (
        <div className="five columns">
          <SearchForm setSearchString={setSearchString} filterObj={filterObj} setFilterObj={setFilterObj} />
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
                  onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-2">
                  Full-Time
                </label>
              </li>
              <li>
                <input
                  id="check-3"
                  type="checkbox"
                  name="check"
                  defaultValue="check-3"
                  onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-3">
                  Part-Time
                </label>
              </li>
              <li>
                <input
                  id="check-4"
                  type="checkbox"
                  name="check"
                  defaultValue="check-4"
                  onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-4">
                  Internship
                </label>
              </li>
              <li>
                <input
                  id="check-5"
                  type="checkbox"
                  name="check"
                  defaultValue="check-5"
                  onChange={(e) => handleJobTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-5">
                  Freelance
                </label>
              </li>
            </ul>
          </div>
          {/* Rate/Hr */}
          <div className="widget">
            <h4>Pay Rate / Hr</h4>
            <ul className="checkboxes">
              <li>
                <input
                  id="check-6"
                  type="checkbox"
                  name="check"
                  defaultValue="check-6"
                  defaultChecked
                  onChange={(e) => handleRateTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-6">Any Rate</label>
              </li>
              <li>
                <input
                  id="check-7"
                  type="checkbox"
                  name="check"
                  defaultValue="check-7"
                  onChange={(e) => handleRateTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-7">
                  Ksh 0 - Ksh 1000
                </label>
              </li>
              <li>
                <input
                  id="check-8"
                  type="checkbox"
                  name="check"
                  defaultValue="check-8"
                  onChange={(e) => handleRateTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-8">
                  Ksh 1001 - Ksh 2500
                </label>
              </li>
              <li>
                <input
                  id="check-9"
                  type="checkbox"
                  name="check"
                  defaultValue="check-9"
                  onChange={(e) => handleRateTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-9">
                  Ksh 2501 - Ksh 5000
                </label>
              </li>
              <li>
                <input
                  id="check-10"
                  type="checkbox"
                  name="check"
                  defaultValue="check-10"
                  onChange={(e) => handleRateTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-10">
                  Ksh 5001 - Ksh 10000
                </label>
              </li>
              <li>
                <input
                  id="check-11"
                  type="checkbox"
                  name="check"
                  defaultValue="check-11"
                  onChange={(e) => handleRateTypes(e.target.value, e.target.checked)}
                />
                <label htmlFor="check-11">
                  Ksh 10000+
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
