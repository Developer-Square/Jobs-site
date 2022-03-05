import React from "react";
// import { debounce, isArray } from "lodash";
import { useLazyQuery } from "react-apollo";
import { GET_FILTERED_COURSES } from "graphql/queries";

import FormikControl from "containers/FormikContainer/FormikControl";

// const DEBOUNCE_WAIT_TIME = 500;
const MAX_LIMIT = 10;
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
  const [hasNext, setHasNext] = React.useState(false);
  const [afterValue, setAfterValue] = React.useState();
  const [allCourses, setAllCourses] = React.useState([
    { value: "", label: "Search Course" },
  ]);

  const [fetchCourses] = useLazyQuery(GET_FILTERED_COURSES, {
    // fetchPolicy: "cache-and-network",
    variables: {
      first: MAX_LIMIT,
    },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setAllCourses(repopulateCourses(data?.courses?.edges));
      setHasNext(data?.courses?.pageInfo?.hasNextPage);
      if (data?.courses?.pageInfo?.hasNextPage) {
        setAfterValue(
          data?.courses?.edges[data?.courses?.edges?.length - 1]?.cursor,
        );
      } else {
        setAfterValue(null);
      }

      if (rest?.setCourseList) {
        rest?.setCourseList(cleanCourses(data?.courses?.edges));
      }
    },
  });
  const searchQuery = (d, a) => {
    const filter = !d || d === "" ? {} : { filter: { search: d } };
    const after = afterValue && afterValue !== "" ? { after: afterValue } : {};
    if (d && d !== "") {
      fetchCourses({
        variables: {
          first: MAX_LIMIT,
          ...filter,
          ...after,
        },
      });
    }
  };

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedSearch = React.useCallback(
  //   debounce(async (newValue, loadedOptions, { after }) => {
  //     await searchQuery(newValue);
  //   return {
  //     options: allCourses,
  //     hasMore: hasNext,
  //     after: afterValue,
  //   };
  //   }, DEBOUNCE_WAIT_TIME),
  //   [],
  // );

  React.useEffect(() => {
    const courseName = rest?.formik?.values?.course;

    if (courseName) {
      if (courseName && courseName !== "") {
        fetchCourses({
          variables: {
            first: MAX_LIMIT,

            filter: {
              search: courseName?.label ? courseName?.label : courseName,
            },
          },
        });
      } else {
        fetchCourses({
          variables: { first: MAX_LIMIT },
        });
      }
    } else {
      fetchCourses({
        variables: { first: MAX_LIMIT },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOptions = async (newValue, loadedOptions, { after }) => {
    const newVal = await searchQuery(newValue);
    console.log("898946546565656546566", newVal);
    return {
      options: allCourses,
      hasMore: hasNext,
      after: afterValue,
    };
  };

  return (
    <FormikControl
      control="async-select"
      label={label}
      name={name}
      loadOptions={loadOptions}
      style={{ margin: 0 }}
      placeholder="Search Course"
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      additional={{
        after: afterValue,
      }}
    />
  );
};

export default CoursesSearch;
