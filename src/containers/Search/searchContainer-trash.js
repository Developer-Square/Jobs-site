import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function SearchContainer() {
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const manyItems = [...new Array(10000)].map((_, i) => ({
    id: i,
    name: `something${i}`,
    description:
      "Some description text, where the search will be performed too.",
  }));

  const movieItems = [
    {
      id: 0,
      title: "Titanic",
      description: "A movie about love",
    },
    {
      id: 1,
      title: "Dead Poets Society",
      description: "A movie about poetry and the meaning of life",
    },
    {
      id: 2,
      title: "Terminator 2",
      description: "A robot from the future is sent back in time",
    },
    {
      id: 3,
      title: "Alien 2",
      description: "Ripley is back for a new adventure",
    },
  ];

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  return (
    <div style={{ width: "90%" }}>
      <ReactSearchAutocomplete
        items={movieItems}
        fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
        resultStringKeyName="title" // String to display in the results
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        className="ico-01"
        placeholder="job title, keywords or company name"
        showIcon={true}
        styling={{
          backgroundColor: "white",
          borderRadius: "3px",
        }}
      />
    </div>
  );
}

export default SearchContainer;
