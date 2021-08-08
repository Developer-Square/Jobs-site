import React, { useEffect,useContext } from 'react';
import $ from 'jquery';
import './Pagination.scss';
import { vacancyLimit } from 'constants/constants'
import { VacancyContext } from 'contexts/vacancies/vacancies.context'
import { getDBIdFromGraphqlId } from 'utils'

function PaginationItem({ data, loading, callLoadFilters }) {
    let pages;
    const { vacancyState, vacancyDispatch } = useContext(VacancyContext);
    useEffect(() => {
        if (vacancyState.pagesArray.length === 0 && data) {
            if (data.vacancies.totalCount % vacancyLimit === 0) {
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
            for(let i = 0; i < pages; i++) {
                array.push(i+1);
            }
            vacancyDispatch({
                type: "ADD_PAGES",
                payload: array
            });
        }
    }, [vacancyState.pagesArray.length, data])

    // For the pagination section.
    // This javascript is only to change the "actpage" attribut on the .cdp div
    const changePageNumber = (evt) => {
        var paginationPage = parseInt($('.cdp').attr('actpage'), 10);
        var go = evt.target.hash.replace('#!', '');
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
    };

    const handleEncode = (id, salary) => {
        const decodedId = getDBIdFromGraphqlId(id, 'Vacancy')
        const cleanedResults = [salary,decodedId];
        let encoded = Buffer.from(JSON.stringify(cleanedResults)).toString("base64");

        return encoded;
    }

    const handleNumberClick = (e, requestedPage) => {
        const {activeIndex} = vacancyState;
        if (vacancyState.sortedJobs && activeIndex !== requestedPage) {
            // Get the last job's id and salary.
            const length = vacancyState.sortedJobs.length;

            if (requestedPage > activeIndex) {
                vacancyDispatch({
                    type: "SET_ACTIVE_INDEX",
                    payload: requestedPage
                });
                const {id, salary} = vacancyState.sortedJobs[length - 1];
                const encodedResult = handleEncode(id, salary);
                callLoadFilters('', encodedResult, vacancyLimit, 0,);
                changePageNumber(e);
            } else {
                vacancyDispatch({
                    type: "SET_ACTIVE_INDEX",
                    payload: requestedPage
                });
                const {id, salary} = vacancyState.sortedJobs[0];
                const encodedResult = handleEncode(id, salary);
                callLoadFilters(encodedResult, '', 0, vacancyLimit,);
                changePageNumber(e);
            }

        }
    }

    // window.addEventListener ? window.addEventListener("load", changePageNumber, false) : window.attachEvent && window.attachEvent("onload", changePageNumber);

    return (
        <div className="pagination-container">
            <div className="content_detail__pagination cdp" actpage={vacancyState.activeIndex}>
            {vacancyState.pagesArray.length ? (<a href="#!-1" className="cdp_i" onClick={(e) => handleNumberClick(e, vacancyState.activeIndex - 1)} >{loading ? 'Loading ...' : 'prev'}</a>): null}
                {vacancyState.pagesArray.length ? vacancyState.pagesArray.map((page, index) => (
                    <a href={`#!${page}`} key={index} className="cdp_i">{loading ? '...' : page}</a>
                )) : null}
            {vacancyState.pagesArray.length ? (<a href="#!+1" className="cdp_i" onClick={(e) => handleNumberClick(e, vacancyState.activeIndex + 1)}>{loading ? 'Loading ...' : 'next'}</a>) : null}
            </div>
      </div>
    )
}


export default PaginationItem
