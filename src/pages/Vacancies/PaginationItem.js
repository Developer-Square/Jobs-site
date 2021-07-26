import React, { useEffect } from 'react';

const PaginationBtn = ({text, handlePageChange}) => {
    return (
        <a href className={text.indexOf('Previous') > -1 ? 'prev' : 'next'} onClick={(e) => handlePageChange(e)}>
            {text}
        </a>
    )
}

function PaginationItem({ loading, data, loadFilterValues, sortByValue }) {
    let pageInfo;
    let pages;
    const [pagesArray, setPagesArray] = React.useState([]);

    useEffect(() => {
        if (data) {
            if (data.totalCount % 10 === 0) {
                // eslint-disable-next-line
                pages = data.vacancies.totalCount / 10
            } else {
                // eslint-disable-next-line
                pages = (Math.floor(data.vacancies.totalCount / 10)) + 1
            }
        }
        // Populate the pagesArray with the page numbers that are expected.
        if (pages) {
            let array = [];
            for(let i = 0; i < pages; i++) {
                array.push(i + 1);
            }
            setPagesArray(array);
        }
    }, [data])

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
              {pagesArray.length ? pagesArray.map((page, index) => (
                <li key={index}>
                    {/* Only add the current-page class to the first item, the first item will
                    always have an index of zero which is falsy. */}
                    <a href className={!index ? "current-page" : ""}>
                        {page}
                    </a>
                </li> 
              )) : 'Loading ...'}
            {pagesArray.length > 3 ? (
                <>
                    <li className="blank">...</li>
                    <li>
                        <a href>22</a>
                    </li>
                </>
            ): null}
 
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
