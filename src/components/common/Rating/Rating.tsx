import React, { useEffect, useState } from 'react';

import './Rating.scss';

// pojedynczy item z nazwą za co jest ocena oraz ilością gwiazdek

interface Props {
    customClass?: string;
    name: string;
    filterData: {
        courseRate: string[];
        activityRate: string[];
        codeRate: string[];
        teamWorkRate: string[];
        workPlace: string | undefined | any;
        contractType: string | undefined | any;
        salary: string | undefined | any;
        internship: string | undefined | any;
        experience: string | undefined | any;
    };
    onClick: (key: string, value: any) => void,
    // setFilterData: React.Dispatch<React.SetStateAction<{
    //     courseRate: string[];
    //     activityRate: string[];
    //     codeRate: string[];
    //     teamWorkRate: string[];
    //     workPlace: string;
    //     contractType: string;
    //     salary: string;
    //     internship: string;
    //     experience: string;
    // }>>
    // dataFilterHandler: any;
}

const STARS_COUNT = 5


const Rating: React.FC<Props> = ({ customClass, name, filterData, onClick }) => {
    const [starsState, setStarsState] = useState<React.ReactNode[]>()
    // console.log(filterData)
    const nameP = name as string;
    const nameState = filterData[nameP as keyof typeof filterData]

    useEffect(() => {
        const starsTable: React.ReactNode[] = []
        
        for (let i=0; i<STARS_COUNT; i++) {
            starsTable.push(
                <label key={`${name}-${i}`}
                className={nameState.includes(String(i + 1)) ? 'active' : ''}
                >{i + 1}<span>★</span>

                    <input type='button'
                        name={name}
                        className='filters-btn'
                        value={i + 1}
                        onClick={e => onClick(e.currentTarget.name, e.currentTarget.value)}/>
                </label>
            )
        }
        setStarsState(starsTable)
    }, [filterData])

    return (
        <div className={customClass}>
            {starsState}
        </div>
    )
}

export default Rating;