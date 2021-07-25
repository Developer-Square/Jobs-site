import React from 'react';

const PaginationBtn = ({text, handlePageChange}) => {
    return (
        <a href className={text.indexOf('Previous') > -1 ? 'prev' : 'next'} onClick={(e) => handlePageChange(e)}>
            {text}
        </a>
    )
}

function PaginationItem({ loading, data, loadFilterValues, sortByValue }) {
    let pageInfo;

    if (data) {
        pageInfo = data.vacancies.pageInfo;
    }

    const handlePageChange = (e) => {
        const direction = e.target.className;
        if (direction === 'next' && pageInfo.hasNextPage) {
            loadFilterValues({
                variables: {
                    first: 10,
                    after: pageInfo.endCursor,
                    sortBy: {
                        direction: sortByValue.direction,
                        field: sortByValue.field
                    }
                }
            })
        } else if (direction === 'prev' && pageInfo.hasPreviousPage) {
            loadFilterValues({
                variables: {
                    last: 10,
                    before: pageInfo.startCursor,
                    sortBy: {
                        direction: sortByValue.direction,
                        field: sortByValue.field
                    }
                }
            })
        } 
    }

    return (
        <div className="pagination-container">
        <nav className="pagination">
          <ul>
            <li>
              <a href className="current-page">
                1
              </a>
            </li>
            <li>
              <a href>2</a>
            </li>
            <li>
              <a href>3</a>
            </li>
            <li className="blank">...</li>
            <li>
              <a href>22</a>
            </li>
          </ul>
        </nav>
        <nav className="pagination-next-prev">
          <ul>
            <li>
                {pageInfo ? pageInfo.hasPreviousPage ? (
                    <>
                        <PaginationBtn text="Previous" handlePageChange={handlePageChange}/>
                    </>
                ): (
                    <>
                        <PaginationBtn text="No Previous Page" handlePageChange={handlePageChange}/>
                    </>
                ): 
                (
                    <>
                        <PaginationBtn text="Loading ..."/>
                    </>
                )
                }
    
            </li>
            <li>
                {pageInfo ? pageInfo.hasNextPage ? (
                    <>
                        <PaginationBtn text="Next" handlePageChange={handlePageChange} />
                    </>
                ): (
                    <>
                        <PaginationBtn text="No Next Page" handlePageChange={handlePageChange}/>
                    </>
                ): (
                    <>
                        <PaginationBtn text="Loading ..."/>
                    </>
                )}
            </li>
          </ul>
        </nav>
      </div>
    )
}

export default PaginationItem
