import React from 'react';
import GetNotes from './GetNotes';

function Organizations() {
    const columns = [
        'name',
        'type',
        'members',
        'relations',
        'found_in',
        'note'
    ]

    return (
        <div className="topComp">
            <div className="ntitle">
                <p>Oranization Notes</p>
            </div>
            <div className="ncontent">
               <GetNotes table="org" columns={columns}/> 
            </div>
        </div>
    )
}


export default Organizations;