import React from 'react'

function SearchForm({setSearchString, filterObj, setFilterObj}) {
    const handleInputChange = (value) => {
        setSearchString(value);
        setFilterObj({
            ...filterObj,
            search: value
        })
    }
    return (
        <>
        {/* Search */}
        <div className="widget">
            <h4>Search</h4>
            <form action="#" method="get">
            <input type="text" onChange={(e) => handleInputChange(e.target.value)} placeholder="Search input..." />
            </form>
        </div>
        </>
    )
}

export default SearchForm
