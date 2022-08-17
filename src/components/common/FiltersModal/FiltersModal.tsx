import React, { useState } from 'react';
import Rating from '../Rating/Rating';
import ButtonLink from '../ButtonLink/ButtonLink';
import labels from 'utils/labels.json'
import {
    ActiveStudentsData,
    ForInterviewStudentToListResponseInterface
} from '../../CandidatesListPage/CandidatesListPage';
import { useDispatch, useSelector } from 'react-redux';
import { DataTypeEnum, setDataType, setSavedFilters} from '../../../actions/students';
import { RootState } from '../../../store';
import { useSearchParams } from 'react-router-dom';

import './FiltersModal.scss';

//modal pojawiający się po wciśnieciu przycisku Filtrowanie


interface Props {
    onClick: () => void;
    setActive: React.Dispatch<React.SetStateAction<ActiveStudentsData>>;
    setForInterview: React.Dispatch<React.SetStateAction<ForInterviewStudentToListResponseInterface[]>>;
    setNumberOfSearchedPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface FilterInterface {
    courseRate: number[],
    activityRate: number[],
    codeRate: number[],
    teamWorkRate: number[],
    workPlace: string[],
    contractType: string[],
    salary: number[]
    internship: boolean | string | null,
    experience: number | string,
}

const MONTHS_COUNT = 6


const FiltersModal: React.FC<Props> = ({ onClick, setForInterview, setActive, setNumberOfSearchedPage }) => {
    const { savedFilters } = useSelector((store: RootState) => store.students)
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const candidates = searchParams.get('candidates');


    const [filterData, setFilterData] = useState({
        courseRate: [],
        activityRate: [],
        codeRate: [],
        teamWorkRate: [],
        workPlace: [],
        contractType: [],
        salary: [0],
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
            salary: [0],
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

    const filtersHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const dataObj: FilterInterface = {
            activityRate: filterData.activityRate.map(item => Number(item)),
            codeRate: filterData.codeRate.map(item => Number(item)),
            courseRate: filterData.courseRate.map(item => Number(item)),
            teamWorkRate: filterData.teamWorkRate.map(item => Number(item)),
            contractType: filterData.contractType,
            experience: filterData.experience === '' ? 0 : Number(filterData.experience),
            internship: filterData.internship === '' ? null : filterData.internship === 'Tak',
            salary: filterData.salary.map(item => Number(item)),
            workPlace: filterData.workPlace,
        }

        try {
            const res = await fetch(`http://localhost:3001/api/recruiter/${1}/filter`, {
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const filtered = await res.json()

            dispatch(setSavedFilters(dataObj))
            dispatch(setDataType(DataTypeEnum.filtered))

            setNumberOfSearchedPage(1)
            setActive(filtered);
        } catch(e){
            throw new Error('Something went weird.')
        }

        // const data =
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
                        <label className={filterData.workPlace.find(el => el === labels.options.workPlaceFilter.remote) ? 'active' : ''}>
                            {labels.options.workPlace.remote}
                            <input
                                type='button'
                                className='filters-btn'
                                name='workPlace'
                                value={labels.options.workPlaceFilter.remote}
                                onClick={btnFilterHandler}
                            />
                        </label>
                        <label className={filterData.workPlace.find(el => el === labels.options.workPlaceFilter.stationary) ? 'active' : ''}>
                            {labels.options.workPlace.office}
                            <input
                                type='button'
                                className='filters-btn'
                                name='workPlace'
                                value={labels.options.workPlaceFilter.stationary}
                                onClick={btnFilterHandler}
                            />
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.contractType.label}</legend>
                    <div className='filter__main-selector buttons'>
                        <label className={filterData.contractType.find(el => el === labels.options.contractTypeFilters.contractOfEmployment) ? 'active' : ''}>
                            {labels.options.contractType.permContract}
                            <input
                                type='button'
                                className='filters-btn'
                                name='contractType'
                                value={labels.options.contractTypeFilters.contractOfEmployment}
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
                        <label className={filterData.contractType.find(el => el === labels.options.contractTypeFilters.contractOfMandate) ? 'active' : ''}>
                            {labels.options.contractType.tempContract}

                            <input
                                type='button'
                                className='filters-btn'
                                name='contractType'
                                value={labels.options.contractTypeFilters.contractOfMandate}
                                onClick={btnFilterHandler} 
                            />
                        </label>
                        <label className={filterData.contractType.find(el => el === labels.options.contractTypeFilters.contractWork) ? 'active' : ''}>
                            {labels.options.contractType.projectContract}
                            <input
                                type='button'
                                className='filters-btn'
                                name='contractType'
                                value={labels.options.contractTypeFilters.contractWork}
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
                                type='text'
                                pattern='[0-9]'
                                placeholder={labels.options.salary.minPlaceholder}
                                name='salary'
                                value={filterData.salary[0] || ''}
                                onChange={e => salaryFilterHandler(e, 0)}
                            />
                        </label>
                        <label>{labels.options.salary.to}
                            <input
                                type='text'
                                pattern='[0-9]'
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