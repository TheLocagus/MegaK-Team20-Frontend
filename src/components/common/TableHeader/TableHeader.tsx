import React from 'react';
import labels from 'utils/labels.json'


const TableHeader: React.FC = () => {


  return (
    <thead>
      <tr>
        <td>{labels.options.courseRate}</td>
        <td>{labels.options.activityRate}</td>
        <td>{labels.options.codeRate}</td>
        <td>{labels.options.teamWorkRate}</td>
        <td>{labels.options.workPlace.label}</td>
        <td>{labels.options.city}</td>
        <td>{labels.options.contractType.label}</td>
        <td>{labels.options.salary.label}</td>
        <td>{labels.options.internship.label}</td>
        <td>{labels.options.experience}</td>
      </tr>
    </thead>
  )
}

export default TableHeader;