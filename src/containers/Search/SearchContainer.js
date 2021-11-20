import React from "react";
import styled from "styled-components";
import { useLazyQuery } from "react-apollo";
import { useHistory } from "react-router-dom";
import { debounce, isEmpty } from "lodash";

import { VACANCIES_QUERY } from "graphql/queries";
import { VacancyContext } from "contexts/vacancies/vacancies.context";
import { searchLimit } from "constants/constants";
import {
  getDBIdFromGraphqlId,
  checkJobType,
  findJobTypeDescription,
  formatCurrency,
} from "utils";

const DEBOUNCE_WAIT_TIME = 2000;

function SearchContainer() {
  const [inputValue, setInputValue] = React.useState("");
  const { jobTypes } = React.useContext(VacancyContext);
  const history = useHistory();

  const [searchVacancies, { loading, data }] = useLazyQuery(VACANCIES_QUERY, {
    fetchPolicy: "cache-and-network",
  });
  const searchQuery = (d) => {
    searchVacancies({
      variables: {
        first: searchLimit,
        filter: { search: d },
      },
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = React.useCallback(
    debounce((newValue) => searchQuery(newValue), DEBOUNCE_WAIT_TIME),
    [],
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSearch(newValue);
  };
  const onClickFunction = (val) => {
    history.push(`/vacancies/${getDBIdFromGraphqlId(val.id, val.__typename)}`);
  };
  const redirectSearch = (val) => {
    if (inputValue !== "") {
      history.push(`/vacancies`);
    }
  };

  return (
    <div style={{ width: "100%", display: "flow-root" }}>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Input
          type="text"
          value={inputValue}
          onChange={(input) => updateValue(input.target.value)}
          placeholder="job title, keywords or company name"
          style={{ width: "90%", marginRight: 0, padding: "18px 20px" }}
        />
        {/* <StyledResults>
      <div className="line" />
      <ul>
        {results.slice(0, maxResults).map((result) => {
          return (
            <li
              onMouseEnter={() => onHover(result)}
              data-test="result"
              key={`rsa-result-${result.id}`}
              onMouseDown={() => handleClick(result)}
              onClick={() => handleClick(result)}
            >
              <SearchIcon showIcon={showIcon} />
              <div className="ellipsis" title={result[resultStringKeyName]}>
                {formatResult(result[resultStringKeyName])}
              </div>
            </li>
          )
        })}
      </ul>
    </StyledResults> */}

        <SuggestContainer>
          <div className="line" />
          {loading ? (
            <ul>{loading && <Li>Loading...</Li>}</ul>
          ) : (
            <ul>
              {Array.isArray(data?.vacancies?.edges) &&
                isEmpty(data?.vacancies?.edges) && (
                  <li
                    className="listing"
                    style={{
                      backgroundColor: "#fdfdfd",
                    }}
                  >
                    😬 No results Found 😔
                  </li>
                )}
              {data?.vacancies?.edges &&
                data.vacancies.edges.map((value, index) => {
                  return (
                    value && (
                      <li
                        onClick={() => onClickFunction(value.node)}
                        className={`listing ${checkJobType(
                          findJobTypeDescription(value.node, jobTypes),
                        )}`}
                        key={index}
                        style={{
                          backgroundColor: "#fdfdfd",
                        }}
                      >
                        <div className="listing-title">
                          <h4>
                            {value?.node?.title}
                            <span className="listing-type">
                              {findJobTypeDescription(value?.node, jobTypes)}
                            </span>
                          </h4>
                          <ul className="listing-icons">
                            <li>
                              <i className="ln ln-icon-Management" />{" "}
                              {value?.node?.postedBy?.name}
                            </li>
                            <li>
                              <i className="ln ln-icon-Map2" />{" "}
                              {value?.node?.location}
                            </li>
                            <li>
                              <i className="ln ln-icon-Money-2" />{" "}
                              {formatCurrency(value?.node?.amount)}
                            </li>
                          </ul>
                        </div>
                      </li>
                    )
                  );
                })}
            </ul>
          )}
        </SuggestContainer>
      </div>
      <button
        style={{
          backgroundColor: "#e6c018",
          marginLeft: "10px",
          float: "right",
          width: "10%",
        }}
        onClick={redirectSearch}
      >
        <i className="fa fa-search" />
      </button>
    </div>
  );
}

export default SearchContainer;

const Input = styled.input`
  //   height: 51px;
  //   padding: 10px;
  //   background: #f3f3f3;
  //   box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);
  //   border-radius: 5px;
  //   border: none;

  min-height: ${(props) => props.theme.height};
  width: 100%;
  display: flex;
  align-items: center;
  > input {
    width: 100%;
    padding: 0 0 0 13px;
    border: none;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
    font-size: inherit;
    font-family: inherit;
    color: ${(props) => props.theme.color};
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${(props) => props.theme.placeholderColor};
      opacity: 1; /* Firefox */
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${(props) => props.theme.placeholderColor};
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${(props) => props.theme.placeholderColor};
    }
  }
`;

const Li = styled.ul`
  height: 51px;
  padding: 5px;
  background: #ffffff;
`;
const SuggestContainer = styled.div`
  height: 240px;

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  > div.line {
    border-top-color: ${(props) => props.theme.lineColor};
    border-top-style: solid;
    border-top-width: 0;
    margin-bottom: 0px;
    margin-left: 14px;
    margin-right: 20px;
    margin-top: 0px;
    padding-bottom: 4px;
    width: 90%;
  }
  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0px 0 16px 0;
    max-height: ${(props) => props.theme.maxHeight};
    > li {
      display: flex;
      align-items: center;
      padding: 4px 0 4px 0;
      &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
        cursor: default;
      }
      > div {
        margin-left: 13px;
      }
    }
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
