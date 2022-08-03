import { useState } from 'react';
import Rating from '../Rating/Rating';
import ButtonLink from '../ButtonLink/ButtonLink';

import { labels } from 'utils/labels'

import './FiltersModal.scss';

//modal pojawiający się po wciśnieciu przycisku Filtrowanie


interface Props {
    onClick: () => void;
}


const FiltersModal: React.FC<Props> = ({ onClick }) => {
    const [filterData, setFilterData] = useState({
        courseRate: '',
        activityRate: '',
        codeRate: '',
        teamWorkRate: '',
        workPlace: '',
        contractType: '',
        salary: '',
        internship: '',
        experience: '',
    })

    const resetFilterDataHandler = () => {
        setFilterData({
            courseRate: '',
            activityRate: '',
            codeRate: '',
            teamWorkRate: '',
            workPlace: '',
            contractType: '',
            salary: '',
            internship: '',
            experience: '',
        })
    }

    const dataFilterHandler = (e: React.MouseEvent<HTMLInputElement>) =>
        setFilterData(dataItem => ({
            ...dataItem,
            [e.currentTarget.name]: e.currentTarget.value
        })
    );

    const timeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => 
        setFilterData(dataItem => ({
            ...dataItem,
            [e.target.name]: e.target.value
        })
    );

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

    console.log(filterData)


    return (
        <main className='filter__main'>
            <form>
                <div className='filter__header'>
                    <h2>{labels.filters.header}</h2>
                    <ButtonLink
                        customClass='filter__header-button'
                        label={labels.buttons.clearFilters}
                        type='button'
                        onClick={resetFilterDataHandler} />
                </div>
                <fieldset>
                    <legend>{labels.options.courseRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        setFilterData={setFilterData}
                        name='courseRate' />
                </fieldset>

                <fieldset>
                    <legend>{labels.options.activityRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        setFilterData={setFilterData}
                        name='activityRate' />
                </fieldset>

                <fieldset>
                    <legend>{labels.options.codeRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        setFilterData={setFilterData}
                        name='codeRate' />
                </fieldset>

                <fieldset>
                    <legend>{labels.options.teamWorkRate}</legend>
                    <Rating
                        customClass='filter__main-selector buttons'
                        setFilterData={setFilterData}
                        name='teamWorkRate'/>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.workPlace.label}</legend>
                    <div className='filter__main-selector buttons'>
                        <input
                            type='button'
                            className='filters-btn'
                            name='workPlace'
                            value={labels.options.workPlace.remote}
                            onClick={dataFilterHandler} />
                        <input
                            type='button'
                            className='filters-btn'
                            name='workPlace'
                            value={labels.options.workPlace.office}
                            onClick={dataFilterHandler} />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.contractType.label}</legend>
                    <div className='filter__main-selector buttons'>
                        <input
                            type='button'
                            className='filters-btn'
                            name='contractType'
                            value={labels.options.contractType.permContract}
                            onClick={dataFilterHandler} />
                        <input
                            type='button'
                            className='filters-btn'
                            name='contractType'
                            value={labels.options.contractType.b2b}
                            onClick={dataFilterHandler} />
                        <input
                            type='button'
                            className='filters-btn'
                            name='contractType'
                            value={labels.options.contractType.tempContract}
                            onClick={dataFilterHandler} />
                        <input
                            type='button'
                            className='filters-btn'
                            name='contractType'
                            value={labels.options.contractType.projectContract}
                            onClick={dataFilterHandler} />
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>{labels.options.salary.label}</legend>
                    <div className='filter__main-selector'>
                        <label>{labels.options.salary.from}
                            <input
                                type='text'
                                placeholder='np. 1000 zł' />
                        </label>
                        <label>{labels.options.salary.to}
                            <input
                                type='text'
                                placeholder='np. 10000 zł' />
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.internship.label}</legend>
                    <div className='filter__main-selector'>
                        <ButtonLink
                            customClass='filters-btn'
                            label={labels.options.internship.yes}
                            name='internship' />
                        <ButtonLink
                            customClass='filters-btn'
                            label={labels.options.internship.no}
                            name='internship' />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>{labels.options.experience}</legend>
                    <div className='filter__main-selector'>
                    <select
                        className='arrows'
                        name='experience'
                        onChange={timeSelectHandler} >
                        <option value='0'>0 {labels.filters.months}</option>
                        <option value='1'>1 {labels.filters.months}</option>
                        <option value='2'>2 {labels.filters.months}</option>
                        <option value='3'>3 {labels.filters.months}</option>
                        <option value='4'>4 {labels.filters.months}</option>
                        <option value='5'>5 {labels.filters.months}</option>
                        <option value='6'>6 {labels.filters.months}</option>
                    </select>
                </div>
                </fieldset>

                <div className='submit'>
                    <ButtonLink
                        customClass='cancel-btn'
                        type='button'
                        label={labels.buttons.cancel}
                        onClick={onClick} />
                    <input
                        className='submit-btn'
                        type='submit'
                        value={labels.buttons.showResults}
                        onClick={filtersHandler} />
                </div>
            </form>
        </main>
    )
}

export default FiltersModal;