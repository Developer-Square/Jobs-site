import React, { useEffect } from 'react';
import $ from 'jquery';
import './Pagination.scss';
import { vacancyLimit } from 'constants/constants'

function PaginationItem({ data, loadFilterValues, loading }) {
    let pages;
    const [pagesArray, setPagesArray] = React.useState([]);
    const [activeIndex, setActiveIndex] = React.useState(0);
    console.log(pagesArray);

    useEffect(() => {
        if (data) {
            if (data.totalCount % vacancyLimit === 0) {
                // eslint-disable-next-line
                pages = data.vacancies.totalCount / vacancyLimit
            } else {
                // eslint-disable-next-line
                pages = (Math.floor(data.vacancies.totalCount / vacancyLimit)) + 1
            }
        }
        // Populate the pagesArray with the page numbers that are expected.
        if (pages) {
            let array = [];
            for(let i = 1; i < pages; i++) {
                array.push(i);
            }
            setPagesArray(array);
        }
    }, [data])

    // For the pagination section.
    // This javascript is only to change the "actpage" attribut on the .cdp div
    const changePageNumber = () => {
        var paginationPage = parseInt($('.cdp').attr('actpage'), 10);
        $('.cdp_i').on('click', function(){
            var go = $(this).attr('href').replace('#!', '');
            // The next button.
            if (go === '+1') {
                paginationPage++;   
            } 

            // The previous button.
            else if (go === '-1') {
                paginationPage--;
            } else {
                paginationPage = parseInt(go, 10);
            }
            $('.cdp').attr('actpage', paginationPage);
        });
    };

    const callLoadFilters = (filterKey, filterValue, firstKey) => {
        loadFilterValues({
            variables: {
                [firstKey]: vacancyLimit,
                [filterKey]: filterValue
            }
        })
    }

    const handleNumberClick = (requestedPage) => {
        if (activeIndex !== requestedPage && requestedPage >= 0) {
            setActiveIndex(requestedPage)
            const results = requestedPage * vacancyLimit + 1;
            const cleanedResults = [results];
            let encoded = Buffer.from(JSON.stringify(cleanedResults)).toString("base64");
            callLoadFilters('after', encoded, 'first');
        }
    }

    window.addEventListener ? window.addEventListener("load", changePageNumber, false) : window.attachEvent && window.attachEvent("onload", changePageNumber);

    return (
        <div className="pagination-container">
            <div className="content_detail__pagination cdp" actpage="1">
            <a href="#!-1" className="cdp_i" onClick={() => handleNumberClick(activeIndex - 1)}>{loading ? 'Loading ...' : 'prev'}</a>
                {pagesArray.length ? pagesArray.map((page, index) => (
                    <a href={`#!${page}`} key={index} class="cdp_i" onClick={() => handleNumberClick(index)}>{loading ? '...' : page}</a>
                )) : null}
            <a href="#!+1" className="cdp_i" onClick={() => handleNumberClick(activeIndex + 1)}>{loading ? 'Loading ...' : 'next'}</a>
            </div>
      </div>
    )
}

export default PaginationItem
