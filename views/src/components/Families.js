import React from 'react';
import GetNotes from './GetNotes';

function Families() {
    const columns = [
        'name',
        'status',
        'family_members',
        'orgs',
        'relations',
        'lives_in',
        'note'
    ]

    return (
        <div className="topComp">
            <div className="ntitle">
                <p>Family Notes</p>
            </div>
            <div className="ncontent">
               <GetNotes table="fam" columns={columns}/> 
            </div>
        </div>
    )
}

export default Families;