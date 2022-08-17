import React from 'react';

// pojedynczy item z nazwą za co jest ocena oraz ilością gwiazdek

interface Props {
    customClass?: string;
    name: string;
    filterData: {
        courseRate: string[];
        activityRate: string[];
        codeRate: string[];
        teamWorkRate: string[];
        workPlace: string[];
        contractType: string[];
        salary: any[];
        internship: string;
        experience: any;
    };
    onClick: (e: any) => void,
}

const STARS_COUNT = 5


const Rating: React.FC<Props> = ({ customClass, name, filterData, onClick }) => {
    const nameString = name as string;
    const nameState = filterData[nameString as keyof typeof filterData]

    const stars = () => {
        const starsTable: React.ReactNode[] = []

        for (let i=0; i<STARS_COUNT; i++) {
            starsTable.push(
                <label key={`${name}-${i}`}
                    className={nameState?.includes(String(i + 1)) ? 'active' : ''}
                    >
                    {i + 1}
                    <span>★</span>
                    <input type='button'
                        name={name}
                        className='filters-btn'
                        value={i + 1}
                        onClick={e => onClick(e)}
                    />
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