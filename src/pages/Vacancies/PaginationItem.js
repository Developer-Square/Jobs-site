import React, { useEffect } from 'react';
import $ from 'jquery';
import './Pagination.scss';

function PaginationItem({ data, loadFilterValues }) {
    let pages;
    const [pagesArray, setPagesArray] = React.useState([]);
    // const [pageInfo, setPageInfo] = React.useState({});
    const [activeIndex, setActiveIndex] = React.useState(0);


    useEffect(() => {
        if (data) {
            if (data.totalCount % 10 === 0) {
                // eslint-disable-next-line
                pages = data.vacancies.totalCount / 10
            } else {
                // eslint-disable-next-line
                pages = (Math.floor(data.vacancies.totalCount / 10)) + 1
            }
            // setPageInfo(data.vacancies.pageInfo);
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

    window.onload = function(){
        // For the pagination section.
        // This javascript is only to change the "actpage" attribut on the .cdp div
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
                [firstKey]: 10,
                [filterKey]: filterValue
            }
        })
    }

    const handleNumberClick = (requestedPage) => {
        if (activeIndex !== requestedPage && requestedPage >= 0) {
            setActiveIndex(requestedPage)
            const results = requestedPage * 10 + 1;
            const cleanedResults = [results];
            let encoded = Buffer.from(JSON.stringify(cleanedResults)).toString("base64");
            callLoadFilters('after', encoded, 'first');
        }
    }

    return (
        <div className="pagination-container">
        <div class="content_detail__pagination cdp" actpage="1">
            <a href="#!-1" class="cdp_i" onClick={() => handleNumberClick(activeIndex - 1)}>prev</a>
                {pagesArray.length ? pagesArray.map((page, index) => (
                    <a href={`#!${page}`} key={index} class="cdp_i" onClick={() => handleNumberClick(index)}>{page}</a>
                )) : null}
            <a href="#!+1" class="cdp_i" onClick={() => handleNumberClick(activeIndex + 1)}>next</a>
        </div>
      </div>
    )
}

export default PaginationItem
