import React from "react";
// import { debounce, isArray } from "lodash";
import { useLazyQuery } from "react-apollo";
import { GET_FILTERED_COURSES } from "graphql/queries";

import { AsyncPaginate } from "react-select-async-paginate";

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
  const setValue = (v) => {
    console.log("===========", v);
  };

  async function loadOptions(d, loadedOptions) {
    const filter = !d || d === "" ? {} : { filter: { search: d } };
    const after = afterValue && afterValue !== "" ? { after: afterValue } : {};
    let response = null;
    if (d && d !== "") {
      response = await fetchCourses({
        variables: {
          first: MAX_LIMIT,
          ...filter,
          ...after,
        },
      });
    }
    console.log("ppppppppppppppppp00000000", response.data);

    return {
      options: response.data,
      hasMore: true,
    };
  }
  return (
    <AsyncPaginate
      isClearable={true}
      loadOptions={loadOptions}
      onChange={setValue}
    />

    //     <AsyncPaginate
    //     value={value}
    //     loadOptions={loadOptions}
    //     onChange={setValue}
    //   />
  );
};

export default CoursesSearch;
