import React from 'react';
import GetNotes from './GetNotes';

function Events() {
    const columns = [
        'name',
        'persons_involved',
        'location',
        'is_combat',
        'loot',
        'note'
    ]

    return (
        <div className="topComp">
            <div className="ntitle">
                <p>Event Notes</p>
            </div>
            <div className="ncontent">
               <GetNotes table="event" columns={columns}/> 
            </div>
        </div>
    )
}

export default Events;