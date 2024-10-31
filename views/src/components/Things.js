import React from 'react';
import GetNotes from './GetNotes';

function People() {
    const columns = [
        'name',
        'type',
        'is_magic',
        'owned_by',
        'description',
        'note'
    ]

    return (
        <div className="topComp">
            <div className="ntitle">
                <p>Event Notes</p>
            </div>
            <div className="ncontent">
               <GetNotes table="thing" columns={columns}/> 
            </div>
        </div>
    )
}

export default People;