import React from "react";
import { debounce, isArray } from "lodash";
import { useLazyQuery } from "react-apollo";
import { GET_FILTERED_COURSES } from "graphql/queries";

import FormikControl from "containers/FormikContainer/FormikControl";

const DEBOUNCE_WAIT_TIME = 500;

const repopulateCourses = (newQuery) => {
  return newQuery.reduce((arr, edge) => {
    arr.push({ value: edge?.node?.id, label: edge?.node?.name });
    return arr;
  }, []);
};

const cleanCourses = (data) => {
  return data.reduce((arr, b) => {
    arr.push({
      value: b.node.id,
      label: b.node.name,
    });
    return arr;
  }, []);
};

const CoursesSearch = ({ label = "Course", name = "course", ...rest }) => {
  const [searchString, setSearchString] = React.useState();
  const [showButton, setShowButton] = React.useState(true);
  const [allCourses, setAllCourses] = React.useState([
    { value: "", label: "Search Course" },
  ]);

  const [fetchCourses] = useLazyQuery(GET_FILTERED_COURSES, {
    // fetchPolicy: "cache-and-network",
    variables: {
      first: 30,
      filter: {
        search: searchString,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setAllCourses(repopulateCourses(data?.courses?.edges));
      if (rest?.setCourseList) {
        rest?.setCourseList(cleanCourses(data?.courses?.edges));
      }
    },
  });
  const searchQuery = (d) => {
    if (d && d !== "") {
      fetchCourses({
        variables: d
          ? {
              first: 40,
              filter: { search: d },
            }
          : { first: 40 },
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = React.useCallback(
    debounce((newValue) => searchQuery(newValue), DEBOUNCE_WAIT_TIME),
    [],
  );

  React.useEffect(() => {
    if (rest?.initialSearch) {
      if (rest?.initialSearch?.searchAfter) {
        fetchCourses({
          variables: { first: 40, after: rest?.initialSearch?.searchString },
        });
      } else {
        if (rest?.initialSearch?.searchType === "array") {
          fetchCourses({
            variables: {
              first: 40,
              filter: {
                [rest?.initialSearch?.searchBy]: isArray(
                  rest?.initialSearch?.searchString,
                )
                  ? rest?.initialSearch?.searchString
                  : rest?.initialSearch?.searchString.split(","),
              },
            },
          });
        } else {
          fetchCourses({
            variables: {
              first: 40,
              after: rest?.initialSearch?.searchString,
              filter: {
                [rest?.initialSearch?.searchBy]:
                  rest?.initialSearch?.searchString,
              },
            },
          });
        }
      }
    } else {
      fetchCourses({
        variables: { first: 40 },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButton = (data) => {
    if (data === "focus") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  const updateValue = (newValue) => {
    setSearchString(newValue);
    // debouncedSearch(newValue);
    return newValue;
  };
  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      debouncedSearch(inputValue);
      callback(allCourses);
    }, 1000);
  };

  // if (loading) {
  //   return <div>loading ...</div>;
  // }

  return (
    <FormikControl
      cacheOptions
      control="select"
      options={allCourses}
      defaultOptions={allCourses}
      showButton={showButton}
      hideButton={(data) => handleButton(data)} // Hide the button when a select input is open, to avoid UI interferance from the button.
      label={label}
      name={name}
      isAsync={true}
      loadOptions={loadOptions}
      handleInputChange={updateValue}
      id="simple-select"
      classNamePrefix="select"
      icon="ln ln-icon-Lock-2"
    />
  );
};

export default CoursesSearch;
