import React from "react";
import { debounce, isEmpty } from "lodash";
import { useLazyQuery } from "react-apollo";
import { GET_FILTERED_COURSES } from "graphql/queries";

import FormikControl from "containers/FormikContainer/FormikControl";

const DEBOUNCE_WAIT_TIME = 1000;

const CoursesSearch = ({ label = "Course", name = "course" }) => {
  const [searchString, setSearchString] = React.useState();

  const [showButton, setShowButton] = React.useState(true);

  const [fetchCourses, { loading, data }] = useLazyQuery(GET_FILTERED_COURSES, {
    // fetchPolicy: "cache-and-network",
    // variables:{
    //   first: 30,
    //   filter:{
    //     search: searchString
    //   }
    // },
    // fetchPolicy: "no-cache",
    // onCompleted: (data) => {
    //   setAllCourses([{ value: "", label: "Search Course" },...repopulateCourses(data?.courses?.edges)]);
    // },
  });
  const searchQuery = () => {
    fetchCourses({
      variables: searchString
        ? {
            first: 40,
            filter: { search: searchString },
          }
        : { first: 40 },
    });
  };
  React.useEffect(() => {
    searchQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButton = (data) => {
    if (data === "focus") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  const repopulateCourses = (newQuery) => {
    return newQuery.reduce((arr, edge) => {
      arr.push({ value: edge?.node?.id, label: edge?.node?.name });
      return arr;
    }, []);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = React.useCallback(
    debounce((newValue) => searchQuery(newValue), DEBOUNCE_WAIT_TIME),
    [],
  );
  const updateValue = (newValue) => {
    console.log(newValue);
    setSearchString(newValue);
    debouncedSearch(newValue);
    return newValue;
  };
  const getCourses = () => {
    return repopulateCourses(data?.courses?.edges);
  };
  console.log(searchString);

  const loadOptions = (props) => {
    setSearchString(props);
    debouncedSearch(props);
    setTimeout(() => {
      return getCourses();
    }, 1000);
  };
  if (loading) {
    return <div>loading ...</div>;
  }

  return (
    <FormikControl
      control="select"
      options={
        data
          ? Array.isArray(data?.vacancies?.edges) &&
            isEmpty(data?.vacancies?.edges)
            ? [{ value: "", label: "Search Course" }]
            : repopulateCourses(data?.courses?.edges)
          : [{ value: "", label: "Search Course" }]
      }
      showButton={showButton}
      hideButton={(data) => handleButton(data)} // Hide the button when a select input is open, to avoid UI interferance from the button.
      label={label}
      name={name}
      isAsync={true}
      loadOptions={loadOptions}
      handleInputChange={updateValue}
      defaultOptions={
        data
          ? Array.isArray(data?.vacancies?.edges) &&
            isEmpty(data?.vacancies?.edges)
            ? [{ value: "", label: "Search Course" }]
            : repopulateCourses(data?.courses?.edges)
          : [{ value: "", label: "Search Course" }]
      }
      id="simple-select"
      classNamePrefix="select"
      icon="ln ln-icon-Lock-2"
    />
  );
};

export default CoursesSearch;
