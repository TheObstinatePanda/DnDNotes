import React from 'react';
import GetNotes from './GetNotes';

function People() {
    const columns = [
        'name',
        'is_npc',
        'family',
        'relations',
        'orgs',
        'note'
    ]

    return (
        <div className="topComp">
            <div className="ntitle">
                <p>People Notes</p>
            </div>
            <div className="ncontent">
               <GetNotes table="people" columns={columns}/> 
            </div>
        </div>
    )
}

export default People;