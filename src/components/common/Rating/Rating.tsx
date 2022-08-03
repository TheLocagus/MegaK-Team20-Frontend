import { startTransition, useState } from 'react';
import ButtonLink from '../ButtonLink/ButtonLink';
import './Rating.scss';

// pojedynczy item z nazwą za co jest ocena oraz ilością gwiazdek

interface Props {
    customClass?: string;
    name?: string;
    // onClick: (e: React.MouseEvent<HTMLElement>) => void,
    setFilterData: React.Dispatch<React.SetStateAction<{
        courseRate: string;
        activityRate: string;
        codeRate: string;
        teamWorkRate: string;
        workPlace: string;
        contractType: string;
        salary: string;
        internship: string;
        experience: string;
    }>>
}

const STARS_COUNT = 5


const Rating: React.FC<Props> = ({ customClass, name, setFilterData }) => {
    const [inputState, setInputState ] = useState(true)

    const dataFilterHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        setFilterData(dataItem => ({...dataItem, [e.currentTarget.name]: e.currentTarget.value}))
    }

    const stars = () => {
        const starsTable: React.ReactNode[] = []
        
        for (let i=0; i<STARS_COUNT; i++) {
            starsTable.push(
                <label key={`${name}-${i}`} >{i + 1}<span>★</span>
                    <input type='button'
                        name={name}
                        className='filters-btn'
                        value={i + 1}
                        onClick={dataFilterHandler}/>
                </label>
            )
        }
        return starsTable
    }

    return (
        <div className={customClass}>
            {stars()}
        </div>
    )
}

export default Rating;