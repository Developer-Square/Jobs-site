import React, {useReducer} from 'react';
import { VacancyContext } from './vacancies.context'

export const initialState = {
    loadedData: false,
    jobsData: []
};

export function reducer(state, { type, payload }) {
    console.log('state', state, 'type', type);
    switch (type) {
        case "ADD_DATA":
            return {
                ...state,
                jobsData: payload,
                loadedData: true
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