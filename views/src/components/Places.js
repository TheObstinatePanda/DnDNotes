import React from 'react';
import GetNotes from './GetNotes';

function Places() {
    const columns = [
        'name',
        'location',
        'type',
        'orgs',
        'owned_by',
        'note'
    ]

    return (
        <div className="topComp">
            <div className="ntitle">
                <p>Location Notes</p>
            </div>
            <div className="ncontent">
               <GetNotes table="place" columns={columns}/> 
            </div>
        </div>
    )
}

export default Places;