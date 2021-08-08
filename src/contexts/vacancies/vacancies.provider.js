import React, {useReducer} from 'react';
import { VacancyContext } from './vacancies.context'

export const initialState = {
    loadedData: false,
    jobsData: [],
    sortedJobs: [],
    sortingByPayRate: false,
    jobTypes: [],
    landingPageJobs: [],
    pagesArray: [],
    activeIndex: 1,
};

export function reducer(state, { type, payload }) {
    switch (type) {
        case "ADD_DATA":
            return {
                ...state,
                jobsData: payload,
                sortedJobs: payload,
                loadedData: true
            }
        case "SORT_JOBS":
            return {
                ...state,
                sortedJobs: payload,
            }
        case "PAYRATE_SORTING":
            return {
                ...state,
                sortingByPayRate: !initialState.sortingByPayRate
            }
        case "SET_JOB_TYPES":
            return {
                ...state,
                jobTypes: payload
            }
        case "SET_VACANCIES_SECTION":
            return {
                ...state,
                landingPageJobs: payload
            }
        case "ADD_PAGES":
            return {
                ...state,
                pagesArray: payload
            }
        case "SET_ACTIVE_INDEX":
            return {
                ...state,
                activeIndex: payload
            }
        default: {
            throw new Error(`Unsupported action type: ${type}`)
        }
    }
}

export const VacancyProvider = ({ children }) => {
    const [vacancyState, vacancyDispatch] = useReducer(reducer, initialState)
    return (
        <VacancyContext.Provider value={{ vacancyState, vacancyDispatch }}>
            {children}
        </VacancyContext.Provider>
    );
}