import React, { useState } from 'react';
import Rating from '../Rating/Rating';
import ButtonLink from '../ButtonLink/ButtonLink';

import { labels } from 'utils/labels'

import './FiltersModal.scss';

//modal pojawiający się po wciśnieciu przycisku Filtrowanie


interface Props {
    onClick: () => void;
}

const MONTHS_COUNT = 6


const FiltersModal: React.FC<Props> = ({ onClick }) => {
    const [filterData, setFilterData] = useState({
        courseRate: [],
        activityRate: [],
        codeRate: [],
        teamWorkRate: [],
        workPlace: [],
        contractType: [],
        salary: [0, ''],
        internship: '',
        experience: '',
    })

    const resetFilterDataHandler = () => {
        setFilterData({
            courseRate: [],
            activityRate: [],
            codeRate: [],
            teamWorkRate: [],
            workPlace: [],
            contractType: [],
            salary: ['', ''],
            internship: '',
            experience: '',
        })
    }

    const btnFilterHandler = (e: any) => {
        const keyString = e.target.name as string;
        const currentState = filterData[keyString as keyof typeof filterData]
        const exist = Array.isArray(currentState) && currentState.find(el => el === e.target.value)

        const newState = () => {
            if(exist) {
                return currentState.filter(el => el !== exist)
            } else {
                return [currentState, e.target.value].flat()
            }
        }
        
        setFilterData(dataItem => ({
            ...dataItem,
            [e.target.name]: newState()
        }))
    };

    const salaryFilterHandler = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const nameString = e.target.name as string;
        const salaryState = filterData[nameString as keyof typeof filterData]
        const newSalaryRange = i === 0 ? [Number(e.target.value), salaryState[1]] : [salaryState[0], Number(e.target.value)]

        setFilterData(dataItem => ({...dataItem, [nameString]: newSalaryRange}))
    }

    const selectFilterHandler = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setFilterData(dataItem => ({
            ...dataItem,
            [e.target.name]: e.target.name === 'experience' ? Number(e.target.value) : e.target.value
        })
    )};

    const filtersHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        // const requestPost = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ filterData })
        // };
        // fetch(`http://localhost:3030/filter`, requestPost)
        // .then(res => res.json())
        // .then(result => setStudentsData(result))
        // .catch(error => console.log(`error ${error}`))
        onClick()
    };

    const months = () => {
        const monthsTable: React.ReactNode[] = []

        for (let i=0; i<=MONTHS_COUNT; i++) {
            monthsTable.push(
                <option key={`month-${i}`} value={i} selected={filterData.experience === String(i)}>
                    {i} {labels.filters.months}
                </option>
            )
        }
        return monthsTable
    }


    return (
        <main className='filter__main'>
            <form>
                <div className='filter__header'>
                    <h2>{labels.filters.header}</h2>
                    <ButtonLink
                        customClass='filter__header-button blue-btn'
                        label={labels.buttons.clearFilters}
                        type='button'
                        onClick={resetFilterDataHandler}
                    />
                </div>
                <fieldset>
                    <legend>{labels.options.courseRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        onClick={btnFilterHandler}
                        name='courseRate'
                        filterData={filterData}
                    />
                </fieldset>

                <fieldset>
                    <legend>{labels.options.activityRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        onClick={btnFilterHandler}
                        name='activityRate'
                        filterData={filterData}
                    />
                </fieldset>

                <fieldset>
                    <legend>{labels.options.codeRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        onClick={btnFilterHandler}
                        name='codeRate'
                        filterData={filterData}
                    />
                </fieldset>

                <fieldset>
                    <legend>{labels.options.teamWorkRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        onClick={btnFilterHandler}
                        name='teamWorkRate'
                        filterData={filterData}
                    />
                </fieldset>

                <fieldset>
                    <legend>{labels.options.workPlace.label}</legend>
                    <div className='filter__main-selector buttons'>
                        <label className={filterData.workPlace.find(el => el === labels.options.workPlace.remote) ? 'active' : ''}>
                            {labels.options.workPlace.remote}
                            <input
                                type='button'
                                className='filters-btn'
                                name='workPlace'
                                value={labels.options.workPlace.remote}
                                onClick={btnFilterHandler}
                            />
                        </label>
                        <label className={filterData.workPlace.find(el => el === labels.options.workPlace.office) ? 'active' : ''}>
                            {labels.options.workPlace.office}
                            <input
                                type='button'
                                className='filters-btn'
                                name='workPlace'
                                value={labels.options.workPlace.office}
                                onClick={btnFilterHandler}
                            />
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.contractType.label}</legend>
                    <div className='filter__main-selector buttons'>
                        <label className={filterData.contractType.find(el => el === labels.options.contractType.permContract) ? 'active' : ''}>
                            {labels.options.contractType.permContract}
                            <input
                                type='button'
                                className='filters-btn'
                                name='contractType'
                                value={labels.options.contractType.permContract}
                                onClick={btnFilterHandler} 
                            />
                        </label>
                        <label className={filterData.contractType.find(el => el === labels.options.contractType.b2b) ? 'active' : ''}>
                            {labels.options.contractType.b2b}
                            <input
                                type='button'
                                className='filters-btn'
                                name='contractType'
                                value={labels.options.contractType.b2b}
                                onClick={btnFilterHandler} 
                            />
                        </label>
                        <label className={filterData.contractType.find(el => el === labels.options.contractType.tempContract) ? 'active' : ''}>
                            {labels.options.contractType.tempContract}
                            <input
                                type='button'
                                className='filters-btn'
                                name='contractType'
                                value={labels.options.contractType.tempContract}
                                onClick={btnFilterHandler} 
                            />
                        </label>
                        <label className={filterData.contractType.find(el => el === labels.options.contractType.projectContract) ? 'active' : ''}>
                            {labels.options.contractType.projectContract}
                            <input
                                type='button'
                                className='filters-btn'
                                name='contractType'
                                value={labels.options.contractType.projectContract}
                                onClick={btnFilterHandler} 
                            />
                        </label>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>{labels.options.salary.label}</legend>
                    <div className='filter__main-selector'>
                        <label>{labels.options.salary.from}
                            <input
                                type='number'
                                min={1}
                                placeholder={labels.options.salary.minPlaceholder}
                                name='salary'
                                value={filterData.salary[0] || ''}
                                onChange={e => salaryFilterHandler(e, 0)}
                            />
                        </label>
                        <label>{labels.options.salary.to}
                            <input
                                type='number'
                                min={1}
                                placeholder={labels.options.salary.maxPlaceholder}
                                name='salary'
                                value={filterData.salary[1] || ''}
                                onChange={e => salaryFilterHandler(e, 1)}
                            />
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.internship.label}</legend>
                    <div className='filter__main-selector radio'>
                        <label>
                            <input
                                type='radio'
                                value={labels.options.internship.yes}
                                name='internship'
                                onChange={selectFilterHandler}
                                checked={filterData.internship === labels.options.internship.yes}
                            />
                            {labels.options.internship.yes}
                        </label>
                        <label>
                            <input
                                type='radio'
                                value={labels.options.internship.no}
                                name='internship'
                                onChange={selectFilterHandler}
                                checked={filterData.internship === labels.options.internship.no}
                            />
                            {labels.options.internship.no}
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.experience}</legend>
                    <div className='filter__main-selector'>
                    <select
                        className='arrows'
                        name='experience'
                        onChange={selectFilterHandler} >
                            {months()}
                    </select>
                </div>
                </fieldset>

                <div className='submit'>
                    <ButtonLink
                        customClass='cancel-btn'
                        type='button'
                        label={labels.buttons.cancel}
                        onClick={onClick}
                    />
                    <input
                        className='submit-btn'
                        type='submit'
                        value={labels.buttons.showResults}
                        onClick={filtersHandler}
                    />
                </div>
            </form>
        </main>
    )
}

export default FiltersModal;