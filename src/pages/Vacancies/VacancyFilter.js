import React, {useEffect, useContext} from "react";
import styled from 'styled-components';
import Button from "components/Button/Button";
import SearchForm from 'containers/Search/SearchForm'
import { IsNotEmpty } from 'helpers/index'
import { VacancyContext } from 'contexts/vacancies/vacancies.context'
import { getGraphqlIdFromDBId, getDBIdFromGraphqlId } from "core/utils";


const VacancyFilter = ({ rate, setRate, ratePerHour, loading, loadFilterValues, setGetJobs, getJobs, sortByValue, setSortByValue}) => {
  const [searchString, setSearchString] = React.useState('');
  const [sortTypes, setSortTypes] = React.useState([]);
  const [filterObj, setFilterObj] = React.useState({search: '', jobType: [],});
  const { vacancyState } = useContext(VacancyContext);
  
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
    const result = getGraphqlIdFromDBId(31, 'Industry')
    const result2 = getDBIdFromGraphqlId('SW5kdXN0cnk6MzE=', 'Industry')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // Only fetch if context API is empty.
    if (vacancyState.jobsData.length === 0) { 
      // Fetch according to the default filters.
      if (IsNotEmpty(sortByValue)) {
        loadFilterValues(
          {variables: { 
            first: 10, 
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
  }, [sortByValue])

  /**
   * @param  {} e
   * A function that will handle all api calls for the vacancy filter.
   */
  const handleSortByInput = () => {
    let sortOption = document.getElementById('sortSelect');
    
    if (sortOption.style.display === 'none') {
      sortOption = document.getElementById('sortSelect_chosen');
    }
    // Clear the field incase the user selects a different option other than
    // newest jobs or oldest jobs.
    setGetJobs('');

    if (sortOption.value === 'salary') {
      setSortByValue({
        direction: 'ASC',
        field: sortOption.value.toUpperCase()
      });
    } else if (sortOption.value === '-salary') {
      setSortByValue({
        direction: 'DESC',
        field: sortOption.value.toUpperCase().slice(1)
      });
    } else if (sortOption.value === 'title') {
      setSortByValue({
        direction: 'ASC',
        field: sortOption.value.toUpperCase()
      });
    } else if (sortOption.value === '-title') {
      setSortByValue({
        direction: 'DESC',
        field: sortOption.value.toUpperCase().slice(1)
      });
    } else if (sortOption.value === '-updated_at') {
      setGetJobs(curr => curr = sortOption.value);
    } else {
      setGetJobs(curr => curr = sortOption.value);
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
    if (checked && value !== 'any') {
      setSortTypes([...sortTypes, value])
      setFilterObj({
        ...filterObj,
        jobType: value
      })
    } else if (value === 'any') {
      setFilterObj({
        ...filterObj,
        jobType: ''
      });
    } else {
      let newSortTypes = sortTypes.filter(filterTypes);
      setSortTypes([...newSortTypes])
      setFilterObj({
        ...filterObj,
        jobType: '' 
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

  const clean = (obj) => {
    for (let propName in obj) {
      if (obj[propName] === '' || obj[propName].length === 0) {
        delete obj[propName];
      }
    }
    return obj;
  }

  const callLoadFilters = () => {
    const cleanedFilterObj = clean(filterObj);
    loadFilterValues(
      {variables: { 
        first: 10, 
        filter: cleanedFilterObj,
        sortBy: {
          direction: sortByValue.direction,
          field: sortByValue.field
        }  
      }
    });
  }

  const handleSubmit = () => {
    // Call the sorting functions.
    // Only sort by rate after the API calls are done.
    if (rate.lowerLimit !== 'any' && Object.values(filterObj).length === 0) {
      ratePerHour();
    }

    if (getJobs === 'updated_at' || getJobs === '-updated_at') {
      loadFilterValues(
        {variables: {
          first: 10
        }}
      );
    }
    
    if ((searchString.length > 0 && IsNotEmpty(sortByValue)) || (sortTypes.length > 0 && IsNotEmpty(sortByValue))) {
      callLoadFilters()
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
                  Full-Time <span>(312)</span>
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
                  Part-Time <span>(269)</span>
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
                  Internship <span>(46)</span>
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
                  $0 - $25 <span>(231)</span>
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
                  $25 - $50 <span>(297)</span>
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
                  $50 - $100 <span>(78)</span>
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
                  $100 - $200 <span>(98)</span>
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
