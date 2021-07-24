import React from 'react'

function SearchForm({setSearchString}) {
    const handleInputChange = (value) => {
        setSearchString(value);
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
