import React from 'react';
import labels from 'utils/labels.json'


const TableHeader: React.FC = () => {


  return (
    <div className='thead'>
      <div className='tr'>
        <div className='td'>{labels.options.activityRate}</div>
        <div className='td'>{labels.options.courseRate}</div>
        <div className='td'>{labels.options.codeRate}</div>
        <div className='td'>{labels.options.teamWorkRate}</div>
        <div className='td'>{labels.options.workPlace.label}</div>
        <div className='td'>{labels.options.city}</div>
        <div className='td'>{labels.options.contractType.label}</div>
        <div className='td'>{labels.options.salary.label}</div>
        <div className='td'>{labels.options.internship.label}</div>
        <div className='td'>{labels.options.experience}</div>
      </div>
    </div>
  )
}

export default TableHeader;